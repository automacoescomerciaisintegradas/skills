# wiki-kit 運用スキーマ

このディレクトリは、LLM が継続的に更新する Markdown ベースの知識ベースです。目的は、原資料の断片を毎回探し直すのではなく、知識を `wiki/` に蓄積し、要約・概念整理・相互参照・矛盾整理を育て続けることにあります。

## 1. あなたの役割

- あなたはこの wiki プロジェクト root の保守担当です
- `raw/` は原資料の層であり、読むことはできますが変更してはいけません
- `wiki/` はあなたが更新する知識ベースです
- `templates/` はページ構造の参考です。必要時に参照し、通常は編集しません
- 人間は資料の投入、優先順位づけ、意思決定を担当します
- あなたは要約、整理、リンク付け、差分反映、保守を担当します

## 2. ディレクトリの意味

- `raw/sources/`: 原資料。記事、論文、PDF、メモ、書き起こし、CSV など
- `raw/assets/`: 画像、図表、添付ファイル
- `wiki/overview.md`: この wiki のテーマ、目的、仮説、観点を整理する親ページ
- `wiki/index.md`: wiki 全体の目次。内容ベースの索引
- `wiki/log.md`: 取り込み、問い合わせ、lint の時系列ログ
- `wiki/open-questions.md`: 未解決の問い、調査候補、保留論点
- `wiki/sources/`: 1つの原資料に対して1ページ作る要約・評価ページ
- `wiki/concepts/`: 概念、テーマ、論点、争点のページ
- `wiki/entities/`: 人物、企業、製品、組織、制度などのページ
- `wiki/syntheses/`: 比較、考察、結論、レポートなど再利用価値の高い問い合わせ結果
- `wiki/maintenance/lint-reports/`: 定期点検のレポート

## 3. 絶対ルール

1. `raw/` のファイルを移動、編集、削除、上書きしない
2. 推測と事実を混同しない。根拠の強さを明記する
3. 内容は日本語で書く
4. すべて Markdown で管理する
5. 新しい知識を追加したら、関連ページへの反映を優先する
6. 変更のたびに `wiki/index.md` と `wiki/log.md` を更新する
7. 既存ページに追記できるなら、安易に新規ページを増やさない
8. 矛盾を見つけたら黙って上書きせず、どの資料が何を言っているかを残す
9. 引用は必要最小限にとどめ、長文転載を避ける
10. 迷ったら `index.md` と関連ページを読み、重複や命名の衝突がないか確認してから編集する

## 4. 記述言語と命名規則

- 本文は日本語で書く
- ファイル名は原則 ASCII の `kebab-case` を使う
- ページの表示名はファイル名ではなく本文タイトルと frontmatter の `title` で表現する
- source summary のファイル名は `YYYY-MM-DD_source-<slug>.md` を推奨する
- synthesis のファイル名は `YYYY-MM-DD_<topic-slug>.md` を推奨する
- entities / concepts は長期的に使うページなので短く安定した名前にする

## 5. frontmatter 規約

新規ページには原則として以下の frontmatter を付けます。

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

補足:

- `source_files` には `raw/` 配下の実ファイルパスを、リポジトリ root からの相対パスで書く（例: `raw/sources/example.pdf`）
- `related_pages` には関連する `wiki/` ページへの相対パスを書く
- `status` は通常 `active` を使い、古い結論に置き換わったときだけ `superseded` にする
- `overview.md`、`index.md`、`log.md`、`open-questions.md` のような初期ページも `type: maintenance` を使う

## 6. ページタイプごとの期待内容

### source

- その資料の要約
- 重要ポイント
- 主張と根拠
- 既存 wiki への影響
- 未解決の問い

### concept

- 概念の定義
- 現在の理解
- 見解の対立や論点
- 関連する資料とエンティティ
- 今後の調査ポイント

### entity

- その対象の概要
- 重要な事実
- 時系列や変遷
- 他の概念やエンティティとの関係
- 追跡すべき論点

### synthesis

- 問い
- 結論
- どのページを根拠にしたか
- 不確実性
- 次のアクション

### maintenance

- 点検の対象範囲
- 問題点
- 推奨アクション
- 優先順位

## 7. 取り込み ingest の手順

新しい資料を処理するときは、必ず次の順序で進めます。

1. `wiki/index.md` と `wiki/log.md` を読み、最近の作業を把握する
2. `raw/sources/` から対象資料を読む
3. `templates/source-summary-template.md` を参考に `wiki/sources/` に要約ページを作る
4. 既存の `concepts/` `entities/` `overview.md` に反映すべき変更があるか確認する
5. 重要な矛盾や新論点があれば `open-questions.md` に反映する
6. `wiki/index.md` に新規ページを追加し、要約と更新日を記録する
7. `wiki/log.md` に取り込みログを追記する

### 取り込み時の判断基準

- 既存概念の補強なら、概念ページへ追記する
- 新しい固有名詞が繰り返し登場しそうなら、entity ページを作る
- まだ議論が荒いが重要なら、concept ページを先に作り未確定部分を残す
- 1回限りのメモなら source summary のみで止めてもよい

## 8. 問い合わせ query の手順

質問に答えるときは、会話履歴より先に wiki を参照します。

1. まず `wiki/index.md` を読み、関連ページ候補を洗い出す
2. 候補ページを読み、必要なら元の source summary に戻る
3. 根拠の強い順に情報を整理して回答する
4. どの wiki ページを根拠にしたかを明示し、可能なら回答内でリンクする
5. 回答内では、何が事実で何が解釈かを分ける
6. その回答が将来も使える比較、考察、まとめなら `wiki/syntheses/` に保存する
7. 保存した場合は `index.md` と `log.md` を更新する

### synthesis として保存すべき内容

- 比較表
- 意思決定の材料になる整理
- 長文の分析
- 複数資料を横断した結論
- 再利用されそうな FAQ 的な回答

## 9. lint の手順

定期点検では、次の観点を必ず確認します。

- 矛盾する記述が複数ページに残っていないか
- 新しい資料で古い結論が陳腐化していないか
- 孤立ページが増えていないか
- 重要概念が source summary に散っていて概念ページ化されていないか
- entity / concept / synthesis のどこにも昇格していない重要論点がないか
- `open-questions.md` に放置された問いが溜まっていないか

lint の結果は `wiki/maintenance/lint-reports/` に保存し、必要なら `open-questions.md` と `index.md` に反映します。

## 10. index.md の更新ルール

- 各ページは1行で概要がわかるようにする
- カテゴリごとに整理する
- 新規ページ追加時は必ず追記する
- 状態が `superseded` になったページは、その旨を明記する
- 可能なら更新日も添える

推奨フォーマット例:

```text
- [page-title](./path/to/page.md): そのページが何を扱うかを1文で説明する。最終更新: 2026-04-07
```

## 11. log.md の更新ルール

ログは append-only の時系列記録です。既存のログ本文は原則書き換えません。

見出しの形式は次で統一します。

```text
## [YYYY-MM-DD] ingest | 資料名
## [YYYY-MM-DD] query | 問いの要約
## [YYYY-MM-DD] lint | 対象範囲
## [YYYY-MM-DD] update | 更新内容
```

各ログには最低限、次を箇条書きで書きます。

- 何をしたか
- どのページを作成または更新したか
- 未解決で残った点

## 12. 相互参照の張り方

- 相対パスの Markdown リンクを使う
- 関連ページはなるべく双方向に張る
- source summary から concept / entity にリンクし、concept / entity 側からも source summary に戻れるようにする
- 単なる関連語の羅列ではなく、なぜ関連するかがわかる文脈でリンクする

## 13. 記述トーン

- 簡潔に書く
- 事実、解釈、仮説を分離する
- 断定には根拠を添える
- 不確実な内容は「未確認」「仮説」「資料間で不一致」などの表現で明示する
- 再利用を前提に、会話口調ではなく参照しやすい文体で書く

## 14. 迷ったときの優先順位

1. `raw/` を汚さない
2. `index.md` と既存ページを見て重複を避ける
3. source summary を作る
4. 必要最小限の concept / entity / synthesis に昇格させる
5. `index.md` と `log.md` を更新する

## 15. 参照テンプレート

新規ページを作るときは必要に応じて以下を参照します。

- `templates/source-summary-template.md`
- `templates/concept-template.md`
- `templates/entity-template.md`
- `templates/synthesis-template.md`
- `templates/lint-report-template.md`
