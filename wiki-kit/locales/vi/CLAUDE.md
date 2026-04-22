# Lược Đồ Vận Hành wiki-kit

Đây là một kho kiến thức dựa trên Markdown mà một LLM liên tục cập nhật. Thay vì tìm kiếm qua các tài liệu thô mỗi lần, mục tiêu là tích lũy kiến thức trong `wiki/`, phát triển các bản tóm tắt, sơ đồ khái niệm, tham chiếu chéo và theo dõi mâu thuẫn theo thời gian.

## 1. Vai Trò Của Bạn

- Bạn là người duy trì gốc dự án wiki này
- `raw/` là lớp nguyên liệu thô; bạn có thể đọc nó nhưng không được phép sửa đổi
- `wiki/` là kho kiến thức mà bạn duy trì
- `templates/` cung cấp các tham chiếu cấu trúc trang; tham khảo khi cần nhưng thường không chỉnh sửa
- Con người xử lý việc nhập liệu, ưu tiên hóa và ra quyết định
- Bạn xử lý tóm tắt hóa, sắp xếp, liên kết, tích hợp diff và bảo trì

## 2. Ngữ Nghĩa Thư Mục

- `raw/sources/`: Nguyên liệu thô — bài báo, luận văn, PDF, ghi chú, bản ghi âm, CSV, v.v.
- `raw/assets/`: Hình ảnh, sơ đồ, tệp đính kèm
- `wiki/overview.md`: Trang cha tổ chức chủ đề, mục đích, giả thuyết và quan điểm của wiki này
- `wiki/index.md`: Mục lục cho toàn bộ wiki; một chỉ mục dựa trên nội dung
- `wiki/log.md`: Nhật ký theo thời gian của các tiếp nhập, truy vấn và lint
- `wiki/open-questions.md`: Các câu hỏi chưa giải quyết, các ứng cử viên nghiên cứu, vấn đề hoãn lại
- `wiki/sources/`: Một trang tóm tắt và đánh giá cho mỗi nguyên liệu thô
- `wiki/concepts/`: Các trang cho các khái niệm, chủ đề, vấn đề và tranh luận
- `wiki/entities/`: Các trang cho con người, công ty, sản phẩm, tổ chức, hệ thống, v.v.
- `wiki/syntheses/`: So sánh, phân tích, kết luận, báo cáo — kết quả truy vấn có tái sử dụng cao
- `wiki/maintenance/lint-reports/`: Các báo cáo kiểm tra định kỳ

## 3. Các Quy Tắc Tuyệt Đối

1. Không bao giờ di chuyển, chỉnh sửa, xóa hoặc ghi đè các tệp trong `raw/`
2. Không bao giờ lẫn lộn suy đoán với sự thật; luôn chỉ ra độ mạnh của bằng chứng
3. Viết tất cả nội dung bằng Tiếng Việt
4. Quản lý mọi thứ trong Markdown
5. Khi thêm kiến thức mới, ưu tiên phản ánh nó trong các trang liên quan
6. Cập nhật `wiki/index.md` và `wiki/log.md` với mỗi thay đổi
7. Nếu bạn có thể nối thêm vào một trang hiện có, đừng tạo một trang mới không cần thiết
8. Khi tìm thấy mâu thuẫn, đừng im lặng ghi đè — ghi lại nguồn nào nói điều gì
9. Giữ trích dẫn ở mức tối thiểu cần thiết; tránh những trích dẫn dài
10. Khi nghi ngờ, trước tiên đọc `index.md` và các trang liên quan để kiểm tra các bản sao và xung đột đặt tên

## 4. Quy Ước Ngôn Ngữ và Đặt Tên

- Viết nội dung chính bằng Tiếng Việt
- Sử dụng `kebab-case` ASCII cho tên tệp như một quy tắc
- Thể hiện tên hiển thị qua tiêu đề trong văn bản và `title` trong frontmatter, không phải tên tệp
- Tên tệp được đề xuất cho các bản tóm tắt nguồn: `YYYY-MM-DD_source-<slug>.md`
- Tên tệp được đề xuất cho các bản tổng hợp: `YYYY-MM-DD_<topic-slug>.md`
- Các trang thực thể và khái niệm có tuổi thọ dài; giữ tên ngắn gọn và ổn định

## 5. Quy Ước Frontmatter

Các trang mới nên bao gồm frontmatter sau:

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

Ghi chú:

- `source_files` nên liệt kê các đường dẫn tệp thực tế dưới `raw/`, tương đối với gốc repository (ví dụ: `raw/sources/example.pdf`)
- `related_pages` nên liệt kê các đường dẫn tương đối đến các trang `wiki/` liên quan
- `status` thường là `active`; chỉ sử dụng `superseded` khi một kết luận cũ hơn đã bị thay thế
- Các trang khung cơ bản như `overview.md`, `index.md`, `log.md` và `open-questions.md` cũng dùng `type: maintenance`

## 6. Nội Dung Dự Kiến Theo Loại Trang

### source

- Tóm tắt nguyên liệu
- Các điểm chính
- Các yêu cầu và bằng chứng
- Tác động đến wiki hiện có
- Các câu hỏi chưa giải quyết

### concept

- Định nghĩa khái niệm
- Sự hiểu biết hiện tại
- Các quan điểm và tranh luận cạnh tranh
- Các tài liệu và thực thể liên quan
- Các hướng nghiên cứu trong tương lai

### entity

- Tổng quan về chủ đề
- Các sự kiện chính
- Dòng thời gian và sự phát triển
- Mối quan hệ với các khái niệm và thực thể khác
- Các điểm cần theo dõi

### synthesis

- Câu hỏi
- Kết luận
- Những trang nào được sử dụng làm bằng chứng
- Những điều không chắc chắn
- Các hành động tiếp theo

### maintenance

- Phạm vi của bài kiểm tra
- Các vấn đề tìm thấy
- Các hành động được khuyến nghị
- Mức độ ưu tiên

## 7. Thủ Tục Tiếp Nhập

Khi xử lý tài liệu mới, luôn tuân theo trình tự sau:

1. Đọc `wiki/index.md` và `wiki/log.md` để hiểu công việc gần đây
2. Đọc tài liệu đích từ `raw/sources/`
3. Tạo trang tóm tắt trong `wiki/sources/` sử dụng `templates/source-summary-template.md` làm hướng dẫn
4. Kiểm tra xem `concepts/`, `entities/` hoặc `overview.md` hiện có có cần cập nhật hay không
5. Nếu có mâu thuẫn hoặc vấn đề mới đáng kể phát sinh, phản ánh chúng trong `open-questions.md`
6. Thêm trang mới vào `wiki/index.md` bằng bản tóm tắt và ngày cập nhật
7. Nối thêm một mục nhập nhật ký tiếp nhập vào `wiki/log.md`

### Tiêu Chí Quyết Định Trong Tiếp Nhập

- Nếu nó củng cố một khái niệm hiện có, nối thêm vào trang khái niệm
- Nếu một danh từ riêng mới xuất hiện và có khả năng tái diễn, tạo một trang thực thể
- Nếu chủ đề quan trọng nhưng vẫn còn thô, tạo một trang khái niệm và để phần không chắc chắn được đánh dấu
- Nếu đó là một ghi chú một lần, một bản tóm tắt nguồn một mình có thể đủ

## 8. Thủ Tục Truy Vấn

Khi trả lời câu hỏi, tham khảo wiki trước lịch sử trò chuyện.

1. Trước tiên đọc `wiki/index.md` để xác định các trang ứng cử viên
2. Đọc các trang ứng cử viên; quay lại bản tóm tắt nguồn nếu cần
3. Sắp xếp thông tin theo thứ tự cường độ bằng chứng và trả lời
4. Nêu rõ các trang wiki cụ thể làm căn cứ và liên kết chúng trong câu trả lời khi có thể
5. Trong câu trả lời, phân biệt giữa sự thật và diễn giải
6. Nếu phản hồi là so sánh, phân tích hoặc bản tóm tắt có thể tái sử dụng, hãy lưu nó vào `wiki/syntheses/`
7. Nếu được lưu, cập nhật `index.md` và `log.md`

### Nội Dung Đáng Lưu Dưới Dạng Tổng Hợp

- Các bảng so sánh
- Tài liệu được sắp xếp để đưa ra quyết định
- Các phân tích dạng dài
- Các kết luận trải dài trên nhiều nguồn
- Các câu trả lời kiểu FAQ có khả năng được tái sử dụng

## 9. Thủ Tục Lint

Trong các bài kiểm tra định kỳ, luôn kiểm tra các điểm sau:

- Có những tuyên bố mâu thuẫn vẫn tồn tại trên nhiều trang không?
- Các tài liệu mới có làm cho các kết luận cũ hơn lỗi thời không?
- Có các trang mồ côi tích lũy không?
- Có những khái niệm quan trọng bị phân tán trên các bản tóm tắt nguồn thay vì được nâng lên các trang khái niệm không?
- Có các vấn đề đáng kể chưa được nâng lên các trang thực thể, khái niệm hoặc tổng hợp không?
- Có những câu hỏi đang tích tụ chưa được giải quyết trong `open-questions.md` không?

Lưu kết quả lint vào `wiki/maintenance/lint-reports/` và phản ánh chúng trong `open-questions.md` và `index.md` khi cần.

## 10. Quy Tắc Cập Nhật index.md

- Mỗi mục nhập trang nên truyền đạt nội dung chính bằng một dòng
- Sắp xếp theo danh mục
- Luôn thêm một mục nhập khi tạo một trang mới
- Khi trạng thái trang trở thành `superseded`, ghi chú điều đó một cách rõ ràng
- Bao gồm ngày cập nhật khi có thể

Định dạng được đề xuất:

```text
- [tiêu-đề-trang](./duong-dan/toi/trang.md): Mô tả một câu về nội dung trang này. Cập nhật lần cuối: 2026-04-07
```

## 11. Quy Tắc Cập Nhật log.md

Nhật ký là một bản ghi theo thời gian chỉ nối thêm. Không viết lại các mục nhập nhật ký hiện có.

Sử dụng định dạng tiêu đề sau một cách nhất quán:

```text
## [YYYY-MM-DD] ingest | tên tài liệu
## [YYYY-MM-DD] query | tóm tắt câu hỏi
## [YYYY-MM-DD] lint | phạm vi
## [YYYY-MM-DD] update | mô tả
```

Mỗi mục nhập nhật ký nên bao gồm tối thiểu:

- Những gì đã được làm
- Những trang nào được tạo hoặc cập nhật
- Những gì vẫn chưa được giải quyết

## 12. Tham Chiếu Chéo

- Sử dụng các liên kết Markdown đường dẫn tương đối
- Tạo các liên kết hai chiều bất cứ khi nào có thể
- Liên kết từ bản tóm tắt nguồn đến các trang khái niệm/thực thể và ngược lại
- Cung cấp ngữ cảnh cho lý do tại sao một liên kết có liên quan, thay vì chỉ liệt kê các thuật ngữ liên quan

## 13. Giọng Văn Bản

- Viết ngắn gọn
- Tách biệt sự thật, diễn giải và giả thuyết
- Hỗ trợ các khẳng định bằng bằng chứng
- Đánh dấu nội dung không chắc chắn rõ ràng bằng các cụm từ như "chưa xác minh," "giả thuyết" hoặc "các nguồn không đồng ý"
- Viết theo phong cách thân thiện với tài liệu tham khảo để tái sử dụng, không phải giọng trò chuyện

## 14. Ưu Tiên Khi Nghi Ngờ

1. Không chạm vào `raw/`
2. Kiểm tra `index.md` và các trang hiện có để tránh trùng lặp
3. Tạo bản tóm tắt nguồn
4. Nâng lên khái niệm / thực thể / tổng hợp chỉ khi cần thiểu
5. Cập nhật `index.md` và `log.md`

## 15. Mẫu Tham Chiếu

Khi tạo các trang mới, tham khảo các phần sau khi cần:

- `templates/source-summary-template.md`
- `templates/concept-template.md`
- `templates/entity-template.md`
- `templates/synthesis-template.md`
- `templates/lint-report-template.md`
