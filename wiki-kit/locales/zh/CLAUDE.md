# wiki-kit 运行架构

这是一个基于 Markdown 的知识库，由大语言模型持续更新。与其每次都搜索原始材料相比，目标是在 `wiki/` 中积累知识，逐步增长摘要、概念映射、交叉引用和矛盾跟踪。

## 1. 您的角色

- 您是此维基项目根目录的维护者
- `raw/` 是原始资料层；您可以读取但绝不能修改
- `wiki/` 是您维护的知识库
- `templates/` 提供页面结构参考；根据需要查阅，但通常不编辑
- 人类负责处理材料摄取、优先级和决策制定
- 您负责总结、组织、链接、差异集成和维护

## 2. 目录语义

- `raw/sources/`：原始资料 — 文章、论文、PDF、笔记、记录、CSV 等
- `raw/assets/`：图像、图表、附件
- `wiki/overview.md`：组织此维基的主题、目的、假设和观点的父页面
- `wiki/index.md`：整个维基的目录；基于内容的索引
- `wiki/log.md`：摄取、查询和代码检查的时间顺序日志
- `wiki/open-questions.md`：未解决的问题、研究候选项、延期问题
- `wiki/sources/`：每个原始材料的一个摘要和评估页面
- `wiki/concepts/`：概念、主题、问题和辩论的页面
- `wiki/entities/`：人物、公司、产品、组织、系统等的页面
- `wiki/syntheses/`：比较、分析、结论、报告 — 高重用性查询结果
- `wiki/maintenance/lint-reports/`：定期审查报告

## 3. 绝对规则

1. 从不移动、编辑、删除或覆盖 `raw/` 中的文件
2. 从不混淆推测与事实；始终指明证据的强度
3. 所有内容应用中文撰写
4. 在 Markdown 中管理所有内容
5. 添加新知识时，优先在相关页面中反映
6. 每次更改时都更新 `wiki/index.md` 和 `wiki/log.md`
7. 如果可以附加到现有页面，则不创建新页面
8. 当找到矛盾时，不要默认覆盖 — 记录哪个来源说了什么
9. 将引用保持在最小必要程度；避免长的逐字摘录
10. 有疑问时，先读 `index.md` 和相关页面以检查重复和命名冲突

## 4. 语言和命名约定

- 正文用中文撰写
- 文件名原则上使用 ASCII `kebab-case`
- 通过正文标题和 frontmatter 中的 `title` 表示显示名称，而不是文件名
- 源摘要的推荐文件名：`YYYY-MM-DD_source-<slug>.md`
- 综合文件的推荐文件名：`YYYY-MM-DD_<topic-slug>.md`
- 实体和概念页面是长期存在的；保持名称简短和稳定

## 5. 前置元数据约定

新页面通常应包含以下前置元数据：

```yaml
---
title: ""
type: source | concept | entity | synthesis | maintenance
status: draft | active | superseded
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: []
source_files: []
related_pages: []
---
```

注意事项：

- `source_files` 应列出 `raw/` 下的实际文件路径，并且相对于仓库根目录（例如 `raw/sources/example.pdf`）
- `related_pages` 应列出相对于 `wiki/` 的相对路径
- `status` 通常为 `active`；仅当较旧的结论被替换时使用 `superseded`
- `overview.md`、`index.md`、`log.md` 和 `open-questions.md` 这类基础脚手架页面也使用 `type: maintenance`

## 6. 页面类型的预期内容

### source（源）

- 材料摘要
- 关键要点
- 声明和证据
- 对现有维基的影响
- 未解决的问题

### concept（概念）

- 概念定义
- 当前理解
- 竞争观点和辩论
- 相关材料和实体
- 未来研究方向

### entity（实体）

- 主题概述
- 关键事实
- 时间线和演变
- 与其他概念和实体的关系
- 监控要点

### synthesis（综合）

- 问题
- 结论
- 使用哪些页面作为证据
- 不确定性
- 后续行动

### maintenance（维护）

- 审查范围
- 发现的问题
- 推荐行动
- 优先级

## 7. 摄取程序

处理新材料时，始终遵循此序列：

1. 读取 `wiki/index.md` 和 `wiki/log.md` 以了解最近的工作
2. 从 `raw/sources/` 读取目标材料
3. 在 `wiki/sources/` 中使用 `templates/source-summary-template.md` 作为指南创建摘要页面
4. 检查现有的 `concepts/`、`entities/` 或 `overview.md` 是否需要更新
5. 如果出现重大矛盾或新问题，在 `open-questions.md` 中反映
6. 将新页面添加到 `wiki/index.md` 的摘要和更新日期
7. 在 `wiki/log.md` 追加摄取日志条目

### 摄取期间的决策标准

- 如果强化现有概念，追加到概念页面
- 如果出现新的专有名词且可能重复出现，创建实体页面
- 如果主题重要但仍未完善，创建概念页面并标记不确定部分
- 如果是一次性说明，仅需源摘要可能足够

## 8. 查询程序

回答问题时，在查询历史之前先查阅维基。

1. 首先读取 `wiki/index.md` 以识别候选页面
2. 读取候选页面；如需要可回到源摘要
3. 按证据强度顺序组织信息并响应
4. 注明所依据的具体 wiki 页面，并在可能时在响应中链接这些页面
5. 在响应中区分事实和解释
6. 如果响应具有可重用的比较、分析或摘要，将其保存到 `wiki/syntheses/`
7. 如果保存，更新 `index.md` 和 `log.md`

### 值得保存为综合的内容

- 比较表
- 决策材料
- 长篇幅分析
- 跨越多个来源的结论
- 可能会被重复引用的常见问题解答式答案

## 9. 代码检查程序

在定期审查期间，始终检查以下内容：

- 多个页面上是否存在持续的矛盾陈述？
- 新材料是否使较旧的结论过时？
- 是否在积累孤立页面？
- 重要概念是否分散在源摘要中而不是提升到概念页面？
- 是否有重大问题尚未提升为实体、概念或综合页面？
- 问题是否在 `open-questions.md` 中堆积未解决？

将代码检查结果保存到 `wiki/maintenance/lint-reports/`，并根据需要在 `open-questions.md` 和 `index.md` 中反映。

## 10. index.md 更新规则

- 每个页面条目应在一行内传达要点
- 按类别组织
- 创建新页面时始终添加条目
- 当页面状态变为 `superseded` 时，明确注明
- 尽可能包含更新日期

推荐格式：

```text
- [页面标题](./path/to/page.md)：此页面涵盖内容的一句话描述。最后更新：2026-04-07
```

## 11. log.md 更新规则

日志是仅追加的时间顺序记录。不要重写现有日志条目。

始终一致地使用以下标题格式：

```text
## [YYYY-MM-DD] ingest | 资料名称
## [YYYY-MM-DD] query | 问题摘要
## [YYYY-MM-DD] lint | 范围
## [YYYY-MM-DD] update | 描述
```

每个日志条目应至少包含：

- 所做工作
- 创建或更新的页面
- 仍未解决的内容

## 12. 交叉引用

- 使用相对路径 Markdown 链接
- 尽可能使链接双向
- 从源摘要链接到概念/实体页面，反之亦然
- 为链接提供上下文说明，而不仅列出相关术语

## 13. 写作风格

- 简洁撰写
- 区分事实、解释和假设
- 用证据支持论断
- 用"未验证"、"假设"或"来源有分歧"等短语明确标记不确定内容
- 以参考友好的方式撰写以便重用，而非对话风格

## 14. 有疑问时的优先级

1. 不要接触 `raw/`
2. 检查 `index.md` 和现有页面以避免重复
3. 创建源摘要
4. 仅根据需要提升到概念/实体/综合
5. 更新 `index.md` 和 `log.md`

## 15. 参考模板

创建新页面时，根据需要参考以下内容：

- `templates/source-summary-template.md`
- `templates/concept-template.md`
- `templates/entity-template.md`
- `templates/synthesis-template.md`
- `templates/lint-report-template.md`
