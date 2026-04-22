# wiki-kit

Một mẫu kho kiến thức dựa trên Markdown được thiết kế để LLM duy trì.

Thay vì phải tìm lại tài liệu thô cho từng câu hỏi, LLM sẽ tích lũy tóm tắt, liên kết chéo và phân tích trong `wiki/`, từ đó xây dựng một lớp tri thức bền vững theo thời gian.

Mẫu này triển khai quy trình làm việc được đề xuất trong gist "[LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)" của karpathy.

## Bắt Đầu Nhanh

```bash
npx create-wiki-kit my-wiki
cd my-wiki
```

Sau đó:

1. Mô tả điều bạn muốn nghiên cứu trong `wiki/overview.md`
2. Thả tài liệu nguồn vào `raw/sources/`
3. Yêu cầu LLM đọc `CLAUDE.md` và ingest chúng

## LLM Sẽ Làm Gì

Khi được trỏ tới `CLAUDE.md`, LLM sẽ tuân theo một quy trình làm việc đã được xác định:

- **Ingest**: Đọc một nguồn thô, tạo bản tóm tắt trong `wiki/sources/`, cập nhật các trang khái niệm và thực thể liên quan, rồi ghi lại công việc trong `index.md` và `log.md`.
- **Query**: Tra cứu wiki trước, trả lời kèm bằng chứng, và lưu các phân tích có thể tái sử dụng vào `wiki/syntheses/`.
- **Lint**: Rà soát wiki định kỳ để phát hiện mâu thuẫn, nội dung lỗi thời, trang mồ côi và các khái niệm quan trọng chưa được nâng cấp.

## Cấu Trúc Thư Mục

Sau khi scaffold, dự án được tạo ra sẽ có dạng như sau:

```text
my-wiki/
├── CLAUDE.md              # Quy tắc vận hành cho LLM
├── AGENTS.md              # Trỏ các agent khác tới CLAUDE.md
├── README.md
├── raw/
│   ├── sources/           # Bài viết, PDF, ghi chú, transcript, v.v.
│   └── assets/            # Hình ảnh, sơ đồ, tệp đính kèm
├── wiki/
│   ├── overview.md        # Chủ đề, mục đích, giả thuyết
│   ├── index.md           # Chỉ mục dựa trên nội dung
│   ├── log.md             # Nhật ký theo thời gian của mọi thao tác
│   ├── open-questions.md  # Câu hỏi chưa giải quyết và các hướng nghiên cứu
│   ├── sources/           # Một trang tóm tắt cho mỗi tài liệu thô
│   ├── concepts/          # Chủ đề lặp lại, tranh luận, thuật ngữ
│   ├── entities/          # Người, công ty, sản phẩm, tổ chức
│   ├── syntheses/         # So sánh, phân tích, kết luận có thể tái sử dụng
│   └── maintenance/
│       └── lint-reports/  # Báo cáo rà soát định kỳ
└── templates/             # Mẫu cấu trúc trang cho LLM
```

## Locale

Mẫu này đi kèm 14 gói locale. Tùy chọn `--locale` chọn ngôn ngữ cho `CLAUDE.md`, template, khung wiki và toàn bộ README. Mặc định là `en`.
`README.md` ở cấp repository này mô tả chính template. Các dự án được tạo ra nên nhận README của locale đã chọn, chẳng hạn `locales/en/README.md` hoặc `locales/ja/README.md`.

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

Để thêm locale mới, hãy tạo `locales/<code>/` trong repository template và thêm bản dịch của toàn bộ 22 tệp.

## Prompt Mẫu

### Khởi tạo

```text
Đọc CLAUDE.md và hiểu mục đích cũng như quy tắc vận hành của wiki này.
Sau đó kiểm tra wiki/overview.md và chuẩn bị số câu hỏi tối thiểu cần thiết để lấp các khoảng trống.
```

### Ingest

```text
Theo CLAUDE.md, xử lý một tài liệu trong raw/sources/ chưa được ingest.
Tạo source summary, cập nhật concepts / entities / overview nếu cần,
rồi cập nhật index.md và log.md.
```

### Query

```text
Trước tiên đọc wiki/index.md, sau đó tham khảo các trang liên quan trong wiki.
Tóm tắt ba lập luận chính về chủ đề này, đồng thời chỉ ra nơi bằng chứng còn yếu.
Nếu kết quả có giá trị tái sử dụng, hãy lưu vào syntheses.
```

### Lint

```text
Theo CLAUDE.md, chạy lint cho toàn bộ wiki.
Xác định các mâu thuẫn, nội dung lỗi thời, trang mồ côi, các khái niệm quan trọng chưa được nâng cấp
và các hướng nghiên cứu tiếp theo. Tạo báo cáo trong wiki/maintenance/lint-reports/,
rồi cập nhật index.md và log.md.
```

## Nguyên Tắc Cốt Lõi

- `raw/` là chỉ đọc đối với LLM; con người đưa tài liệu vào và LLM không bao giờ sửa chúng
- `wiki/` là lớp tri thức mà LLM phát triển; các bản tóm tắt và liên kết chéo được tích lũy tại đây
- `index.md` và `log.md` được cập nhật ở mọi thao tác
- Các kết quả query có giá trị cao được lưu vào `syntheses/` thay vì chỉ nằm trong cuộc trò chuyện
- Việc lint định kỳ giúp phát hiện mâu thuẫn và khoảng trống trước khi chúng tích tụ

## Sử Dụng Với Các Agent Khác

Các quy tắc vận hành được định nghĩa trong `CLAUDE.md`. Với các agent đọc `AGENTS.md` (chẳng hạn Codex), tệp đó sẽ chuyển hướng tới `CLAUDE.md`. Nếu cần, hãy sao chép nội dung sang định dạng cấu hình riêng của agent đó.
