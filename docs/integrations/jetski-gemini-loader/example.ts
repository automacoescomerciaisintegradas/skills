import path from "path";
import {
  loadSkillIndex,
  buildModelMessages,
  Message,
} from "./loader";

const REPO_ROOT = "/path/to/antigravity-awesome-skills";
const SKILLS_ROOT = REPO_ROOT;
const INDEX_PATH = path.join(REPO_ROOT, "skills_index.json"); // Path corrected to root index

// 1. Bootstrap once at agent startup
const skillIndex = loadSkillIndex(INDEX_PATH);

// 2. Before calling the model, build messages with lazy‑loaded skills
async function runTurn(trajectory: Message[]) {
  const baseSystemMessages: Message[] = [
    {
      role: "system",
      content: "You are a helpful coding agent.",
    },
  ];

  const modelMessages = await buildModelMessages({
    baseSystemMessages,
    trajectory,
    skillIndex,
    skillsRoot: SKILLS_ROOT,
    maxSkillsPerTurn: 8,
    overflowBehavior: "error",
  });

  // 3. Pass `modelMessages` to your Jetski/Cortex + Gemini client
  // e.g. trajectoryChatConverter.convert(modelMessages)
  console.log("Model messages built with", modelMessages.length, "total blocks.");
}
