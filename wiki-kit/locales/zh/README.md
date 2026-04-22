# wiki-kit

一个面向由 LLM 维护的 Markdown 知识库模板。

它不是让你每次提问都重新翻找原始资料，而是让 LLM 持续把摘要、交叉引用和分析积累到 `wiki/` 中，逐步形成持久的知识层。

这个模板实现了 karpathy 在 gist「[LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)」中提出的工作流。

## 快速开始

```bash
npx create-wiki-kit my-wiki
cd my-wiki
```

然后：

1. 在 `wiki/overview.md` 中写下你想研究的内容
2. 把源材料放入 `raw/sources/`
3. 让 LLM 阅读 `CLAUDE.md` 并执行摄取

## LLM 会做什么

当它以 `CLAUDE.md` 为准时，LLM 会遵循一套明确的工作流：

- **Ingest**：读取原始资料，在 `wiki/sources/` 中创建摘要，更新相关概念页和实体页，并把这次工作记录到 `index.md` 和 `log.md`。
- **Query**：优先查阅 wiki，而不是对话历史；基于证据作答；并把可复用的分析保存到 `wiki/syntheses/`。
- **Lint**：定期检查 wiki 中的矛盾、过时内容、孤立页面，以及尚未提升的重要概念。

## 目录结构

完成脚手架后，生成的项目结构如下：

```text
my-wiki/
├── CLAUDE.md              # LLM 的操作规则
├── AGENTS.md              # 将其他代理指向 CLAUDE.md
├── README.md
├── raw/
│   ├── sources/           # 文章、PDF、笔记、转录稿等
│   └── assets/            # 图片、图表、附件
├── wiki/
│   ├── overview.md        # 主题、目标、假设
│   ├── index.md           # 基于内容的索引
│   ├── log.md             # 所有操作的时间顺序记录
│   ├── open-questions.md  # 未解决问题与研究候选
│   ├── sources/           # 每份原始资料对应一页摘要
│   ├── concepts/          # 反复出现的主题、争议、术语
│   ├── entities/          # 人物、公司、产品、组织
│   ├── syntheses/         # 对比、分析、可复用结论
│   └── maintenance/
│       └── lint-reports/  # 定期审查报告
└── templates/             # 提供给 LLM 的页面结构参考
```

## Locale

这个模板内置了 14 个 locale 包。`--locale` 选项用于选择 `CLAUDE.md`、模板、wiki 脚手架以及所有 README 文件的语言。默认值是 `en`。
仓库根目录下的这个 `README.md` 说明的是模板本身。生成出来的项目应当使用所选 locale 的 README，例如 `locales/en/README.md` 或 `locales/ja/README.md`。

| Code | Language    | Code | Language    |
|------|-------------|------|-------------|
| `de` | German      | `ko` | Korean      |
| `en` | English     | `pt` | Portuguese  |
| `es` | Spanish     | `ru` | Russian     |
| `fr` | French      | `th` | Thai        |
| `id` | Indonesian  | `tr` | Turkish     |
| `it` | Italian     | `vi` | Vietnamese  |
| `ja` | Japanese    | `zh` | Chinese     |

```bash
npx create-wiki-kit my-wiki --locale ja
```

如果要添加新的 locale，请在模板仓库中创建 `locales/<code>/`，并提供全部 22 个文件的翻译版本。

## 示例 Prompt

### 初始化

```text
阅读 CLAUDE.md，并理解这个 wiki 的目标与操作规则。
然后检查 wiki/overview.md，并准备最少的问题来补齐缺口。
```

### Ingest

```text
按照 CLAUDE.md 的要求，处理 raw/sources/ 中一份尚未摄取的资料。
创建 source summary，并在需要时更新 concepts / entities / overview，
然后更新 index.md 和 log.md。
```

### Query

```text
先阅读 wiki/index.md，再查看 wiki 中相关页面。
总结这个主题的三个主要论点，并指出证据薄弱的地方。
如果结果具有复用价值，就把它保存到 syntheses。
```

### Lint

```text
按照 CLAUDE.md，对整个 wiki 执行 lint。
识别矛盾、过时内容、孤立页面、尚未提升的关键概念
以及研究候选项。在 wiki/maintenance/lint-reports/ 中创建报告，
然后更新 index.md 和 log.md。
```

## 核心原则

- `raw/` 对 LLM 来说是只读的；资料由人类放入，LLM 不会修改它们
- `wiki/` 是由 LLM 持续生长的知识层；摘要和交叉引用会积累在这里
- 每次操作都要更新 `index.md` 和 `log.md`
- 高价值的 query 结果应保存到 `syntheses/`，而不是只留在对话里
- 定期 lint 可以在矛盾和空白扩大之前把它们发现出来

## 与其他 Agent 一起使用

操作规则定义在 `CLAUDE.md` 中。对于会读取 `AGENTS.md` 的 agent（例如 Codex），该文件会把它们引导到 `CLAUDE.md`。如果需要，可以把内容复制到对应 agent 的配置格式中。
