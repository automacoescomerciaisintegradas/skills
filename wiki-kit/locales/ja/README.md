# wiki-kit

LLM によって保守されることを前提にした Markdown ベースの知識ベース用テンプレートです。

質問のたびに原資料を探し直すのではなく、LLM が `wiki/` に要約、相互参照、分析を蓄積し、継続的に知識レイヤーを育てていきます。

このテンプレートは、karpathy の gist「[LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)」で提案されている運用を実装しています。

## クイックスタート

```bash
npx create-wiki-kit my-wiki
cd my-wiki
```

次に:

1. `wiki/overview.md` に調べたいテーマを書く
2. 原資料を `raw/sources/` に入れる
3. LLM に `CLAUDE.md` を読ませて取り込みを実行させる

## LLM が行うこと

`CLAUDE.md` を起点にすると、LLM は定義済みのワークフローに従います。

- **取り込み**: 原資料を読み、`wiki/sources/` に要約を作成し、関連する概念ページやエンティティページを更新して、作業内容を `index.md` と `log.md` に記録します。
- **問い合わせ**: 会話履歴ではなく wiki を先に参照し、根拠付きで回答し、再利用価値のある分析は `wiki/syntheses/` に保存します。
- **lint**: wiki 全体を定期的に見直し、矛盾、古くなった記述、孤立ページ、未昇格の重要概念を点検します。

## ディレクトリ構成

生成後のプロジェクト構成は次のようになります。

```text
my-wiki/
├── CLAUDE.md              # LLM 向けの運用ルール
├── AGENTS.md              # 他エージェントを CLAUDE.md に誘導
├── README.md
├── raw/
│   ├── sources/           # 記事、PDF、メモ、書き起こしなど
│   └── assets/            # 画像、図表、添付ファイル
├── wiki/
│   ├── overview.md        # テーマ、目的、仮説
│   ├── index.md           # 内容ベースの索引
│   ├── log.md             # すべての操作の時系列記録
│   ├── open-questions.md  # 未解決の問いと調査候補
│   ├── sources/           # 原資料ごとの要約ページ
│   ├── concepts/          # 繰り返し現れるテーマ、論点、用語
│   ├── entities/          # 人物、企業、製品、組織
│   ├── syntheses/         # 比較、分析、再利用可能な結論
│   └── maintenance/
│       └── lint-reports/  # 定期レビューのレポート
└── templates/             # LLM 向けのページ構造テンプレート
```

## ロケール

このテンプレートには 14 個のロケールパックが含まれています。`--locale` オプションで `CLAUDE.md`、テンプレート、wiki のひな形、すべての README の言語を切り替えられます。デフォルトは `en` です。
リポジトリ直下の `README.md` はテンプレート自体の説明用です。生成されるプロジェクトには、`locales/en/README.md` や `locales/ja/README.md` のように、選択したロケールの README が入る想定です。

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

新しいロケールを追加する場合は、テンプレートリポジトリ内に `locales/<code>/` を作成し、22 ファイルすべての翻訳版を用意してください。

## 例のプロンプト

### 初期化

```text
CLAUDE.md を読み、この wiki の目的と運用ルールを理解して。
次に wiki/overview.md を確認し、不足を埋めるための質問を最小限で整理して。
```

### 取り込み

```text
CLAUDE.md に従って、raw/sources/ にある未取り込みの資料を 1 件処理して。
source summary を作成し、必要なら concepts / entities / overview を更新し、
最後に index.md と log.md を更新して。
```

### 問い合わせ

```text
最初に wiki/index.md を読み、その後 wiki/ 内の関連ページを参照して。
このテーマの主要な論点を 3 つに要約し、証拠が弱い点も明記して。
結果に再利用価値があれば syntheses に保存して。
```

### Lint

```text
CLAUDE.md に従って wiki 全体を lint して。
矛盾、古い記述、孤立ページ、未昇格の重要概念、調査候補を洗い出し、
wiki/maintenance/lint-reports/ にレポートを作成してから index.md と log.md を更新して。
```

## 基本原則

- `raw/` は LLM にとって読み取り専用であり、人間が資料を置き、LLM は変更しない
- `wiki/` は LLM が育てる知識レイヤーであり、要約や相互参照はここに蓄積される
- すべての操作で `index.md` と `log.md` を更新する
- 価値の高い問い合わせ結果は会話に埋もれさせず `syntheses/` に保存する
- 定期的な lint によって矛盾や空白が大きくなる前に検出する

## 他のエージェントとの併用

運用ルールは `CLAUDE.md` で定義されています。`AGENTS.md` を読むエージェント（Codex など）向けには、`AGENTS.md` が `CLAUDE.md` を参照する構成になっています。必要であれば、それぞれのエージェント用設定形式に内容を移してください。
