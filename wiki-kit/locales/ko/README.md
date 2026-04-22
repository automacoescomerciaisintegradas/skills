# wiki-kit

LLM이 유지보수하도록 설계된 Markdown 기반 지식베이스 템플릿입니다.

질문이 생길 때마다 원자료를 다시 찾는 대신, LLM이 `wiki/`에 요약, 교차 참조, 분석을 축적해 가며 시간이 지날수록 지속적인 지식 레이어를 구축합니다.

이 템플릿은 karpathy의 "[LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)" gist에서 제안한 워크플로를 구현합니다.

## 빠른 시작

```bash
npx create-wiki-kit my-wiki
cd my-wiki
```

다음으로:

1. `wiki/overview.md`에 조사하려는 내용을 작성합니다
2. 소스 자료를 `raw/sources/`에 넣습니다
3. LLM에게 `CLAUDE.md`를 읽고 이를 인제스트하도록 요청합니다

## LLM이 하는 일

`CLAUDE.md`를 기준으로 삼으면 LLM은 정의된 워크플로를 따릅니다.

- **인제스트**: 원자료를 읽고 `wiki/sources/`에 요약을 만들고, 관련 개념 및 엔티티 페이지를 업데이트한 뒤, 작업 내용을 `index.md`와 `log.md`에 기록합니다.
- **질의**: 대화 기록이 아니라 wiki를 먼저 참고하고, 근거와 함께 답변하며, 재사용 가치가 있는 분석은 `wiki/syntheses/`에 저장합니다.
- **린트**: wiki를 주기적으로 검토해 모순, 오래된 내용, 고아 페이지, 승격되지 않은 핵심 개념을 점검합니다.

## 디렉터리 구조

스캐폴딩 이후 생성되는 프로젝트 구조는 다음과 같습니다.

```text
my-wiki/
├── CLAUDE.md              # LLM용 운영 규칙
├── AGENTS.md              # 다른 에이전트를 CLAUDE.md로 안내
├── README.md
├── raw/
│   ├── sources/           # 기사, PDF, 노트, 녹취록 등
│   └── assets/            # 이미지, 다이어그램, 첨부파일
├── wiki/
│   ├── overview.md        # 주제, 목적, 가설
│   ├── index.md           # 내용 기반 인덱스
│   ├── log.md             # 모든 작업의 연대기 기록
│   ├── open-questions.md  # 미해결 질문과 조사 후보
│   ├── sources/           # 원자료별 요약 페이지
│   ├── concepts/          # 반복되는 주제, 논쟁, 용어
│   ├── entities/          # 사람, 회사, 제품, 조직
│   ├── syntheses/         # 비교, 분석, 재사용 가능한 결론
│   └── maintenance/
│       └── lint-reports/  # 정기 점검 보고서
└── templates/             # LLM용 페이지 구조 참고 템플릿
```

## 로케일

이 템플릿에는 14개의 로케일 팩이 포함되어 있습니다. `--locale` 옵션은 `CLAUDE.md`, 템플릿, wiki 스캐폴딩, 모든 README 파일의 언어를 선택합니다. 기본값은 `en`입니다.
리포지토리 루트의 `README.md`는 템플릿 자체를 설명합니다. 생성된 프로젝트에는 `locales/en/README.md` 또는 `locales/ja/README.md`처럼 선택한 로케일 팩의 README가 들어가야 합니다.

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

새 로케일을 추가하려면 템플릿 저장소에 `locales/<code>/`를 만들고, 22개 파일 전체의 번역본을 넣어야 합니다.

## 예시 프롬프트

### 초기화

```text
CLAUDE.md를 읽고 이 wiki의 목적과 운영 규칙을 이해해.
그 다음 wiki/overview.md를 확인하고, 빈 부분을 메우기 위한 최소한의 질문을 준비해.
```

### 인제스트

```text
CLAUDE.md에 따라 raw/sources/에 있는 아직 인제스트되지 않은 자료 하나를 처리해.
source summary를 만들고, 필요하면 concepts / entities / overview를 업데이트한 다음,
index.md와 log.md를 업데이트해.
```

### 질의

```text
먼저 wiki/index.md를 읽고, 그 다음 wiki 안의 관련 페이지를 참고해.
이 주제의 핵심 주장 세 가지를 요약하고, 근거가 약한 부분도 표시해.
결과에 재사용 가치가 있으면 syntheses에 저장해.
```

### 린트

```text
CLAUDE.md에 따라 전체 wiki에 대해 lint를 실행해.
모순, 오래된 내용, 고아 페이지, 승격되지 않은 핵심 개념,
그리고 추가 조사 후보를 식별해. wiki/maintenance/lint-reports/에 보고서를 만들고,
그 다음 index.md와 log.md를 업데이트해.
```

## 핵심 원칙

- `raw/`는 LLM에 대해 읽기 전용이며, 사람만 자료를 넣고 LLM은 수정하지 않습니다
- `wiki/`는 LLM이 키워 가는 지식 레이어이며, 요약과 교차 참조가 이곳에 쌓입니다
- 모든 작업마다 `index.md`와 `log.md`를 업데이트합니다
- 가치가 높은 질의 결과는 대화에만 남기지 말고 `syntheses/`에 저장합니다
- 주기적인 lint로 모순과 공백이 커지기 전에 잡아냅니다

## 다른 에이전트와 함께 사용하기

운영 규칙은 `CLAUDE.md`에 정의되어 있습니다. `AGENTS.md`를 읽는 에이전트(예: Codex)의 경우, 해당 파일이 `CLAUDE.md`로 안내합니다. 필요하다면 내용을 해당 에이전트의 설정 형식으로 옮기면 됩니다.
