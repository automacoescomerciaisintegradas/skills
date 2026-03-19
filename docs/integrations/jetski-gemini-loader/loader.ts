import * as fs from "fs";
import * as path from "path";

export type SkillMeta = {
  id: string;
  path: string;
  name: string;
  description?: string;
  category?: string;
  risk?: string;
};

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

const SKILL_ID_REGEX = /@([a-zA-Z0-9-_./]+)/g;

/**
 * Bootstrap: Load the skill manifest once at startup.
 */
export function loadSkillIndex(indexPath: string): Map<string, SkillMeta> {
  const raw = fs.readFileSync(indexPath, "utf8");
  const arr = JSON.parse(raw) as SkillMeta[];
  const map = new Map<string, SkillMeta>();
  for (const meta of arr) {
    map.set(meta.id, meta);
  }
  return map;
}

/**
 * Parsing: Find all @skill-id mentions in the message history.
 */
export function resolveSkillsFromMessages(
  messages: Message[],
  index: Map<string, SkillMeta>,
  maxSkills: number
): SkillMeta[] {
  const found = new Set<string>();

  for (const msg of messages) {
    let match: RegExpExecArray | null;
    while ((match = SKILL_ID_REGEX.exec(msg.content)) !== null) {
      const id = match[1];
      if (index.has(id)) {
        found.add(id);
      }
    }
  }

  const metas: SkillMeta[] = [];
  for (const id of found) {
    const meta = index.get(id);
    if (meta) metas.push(meta);
    if (metas.length >= maxSkills) break;
  }

  return metas;
}

/**
 * Lazy Load: Read the SKILL.md file contents for the selected skills.
 */
export async function loadSkillBodies(
  skillsRoot: string,
  metas: SkillMeta[]
): Promise<string[]> {
  const bodies: string[] = [];

  for (const meta of metas) {
    const fullPath = path.join(skillsRoot, meta.path, "SKILL.md");
    const text = await fs.promises.readFile(fullPath, "utf8");
    bodies.push(text);
  }

  return bodies;
}

/**
 * Core Logic: Build the system prompt messages with only the necessary skills.
 */
export async function buildModelMessages({
  baseSystemMessages,
  trajectory,
  skillIndex,
  skillsRoot,
  maxSkillsPerTurn,
  overflowBehavior = "truncate",
}: {
  baseSystemMessages: Message[];
  trajectory: Message[];
  skillIndex: Map<string, SkillMeta>;
  skillsRoot: string;
  maxSkillsPerTurn: number;
  overflowBehavior?: "truncate" | "error";
}): Promise<Message[]> {
  const referencedSkills = resolveSkillsFromMessages(
    trajectory,
    skillIndex,
    Number.MAX_SAFE_INTEGER
  );

  if (
    overflowBehavior === "error" &&
    referencedSkills.length > maxSkillsPerTurn
  ) {
    throw new Error(
      `Too many skills requested in a single turn. Reduce @skill-id usage to ${maxSkillsPerTurn} or fewer.`
    );
  }

  const selectedMetas = resolveSkillsFromMessages(
    trajectory,
    skillIndex,
    maxSkillsPerTurn
  );

  const skillBodies = await loadSkillBodies(skillsRoot, selectedMetas);

  const skillMessages = skillBodies.map((body) => ({
    role: "system" as const,
    content: body,
  }));

  return [...baseSystemMessages, ...skillMessages, ...trajectory];
}
