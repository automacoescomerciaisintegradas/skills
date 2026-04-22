# raw

Thư mục này lưu trữ các nguyên liệu thô.

## Nguyên Tắc

- Các tệp được đặt ở đây được coi là bất biến
- LLM có thể đọc chúng nhưng không được phép chỉnh sửa, di chuyển hoặc xóa chúng
- Giữ nguyên các tệp gốc

## Thư Mục Con

- `sources/`: Bài báo, PDF, ghi chú, bản ghi âm cuộc họp, CSV, v.v.
- `assets/`: Sơ đồ, hình ảnh, tệp đính kèm

Sau khi thêm tài liệu, yêu cầu LLM tiếp nhập chúng để kiến thức được phản ánh trong `wiki/`.
