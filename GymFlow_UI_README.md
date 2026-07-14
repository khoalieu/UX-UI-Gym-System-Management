# GymFlow UI Restructure README

## 1. Project Overview

**Project name:** GymFlow – Hệ thống quản lý phòng tập Gym.

**Goal:** Chuẩn hóa toàn bộ giao diện cho dự án GymFlow theo hướng có phân quyền theo vai trò, sidebar đúng từng actor, luồng nghiệp vụ rõ ràng, và đủ màn hình để AI thiết kế trong Figma Make, Visily hoặc công cụ UI tương tự.

README này là bản tóm tắt để AI đọc và tạo giao diện đúng ý.

---

## 2. Global UI Design Rules

Tất cả giao diện phải dùng chung một phong cách:

- Desktop web dashboard, khuyến nghị frame `1440 x 1024`.
- Nền trắng/xám nhạt, màu chính xanh dương.
- Card bo góc, shadow nhẹ, giao diện hiện đại, sạch, chuyên nghiệp.
- Có sidebar theo vai trò, topbar có search, notification, avatar, tên user, role.
- Có bảng dữ liệu kèm filter, pagination, action menu.
- Có form kèm validation state.
- Có confirm modal cho thao tác nguy hiểm.
- Có empty/loading/error/success state.
- Tất cả text trong UI phải là **tiếng Việt**.
- Dữ liệu mẫu dùng ngữ cảnh Việt Nam: tên người Việt, VND, trạng thái tiếng Việt.
- Không trộn menu Admin vào giao diện Hội viên/PT/Thu ngân/Lễ tân.
- Mỗi màn hình phải active đúng module trên sidebar.

---

## 3. Suggested File Structure

Tổ chức file thiết kế thành các page:

1. `00 Design System`
2. `01 Auth`
3. `02 Admin & Manager`
4. `03 Reception / Staff`
5. `04 Cashier`
6. `05 PT Portal`
7. `06 Equipment Manager`
8. `07 Member Portal`
9. `08 Reports & System`
10. `09 Shared Modals & States`

---

## 4. Frame Naming Rule

Đặt tên frame theo mẫu:

```text
[ROLE] Number - Module - Screen Name
```

Ví dụ:

```text
[COMMON] 00 - Auth - Dang nhap
[ADMIN] 01 - Dashboard - Tong quan he thong
[RECEPTIONIST] 01 - Dashboard - Van hanh le tan
[CASHIER] 01 - Dashboard - Tai chinh thu ngan
[PT] 01 - Dashboard - Tong quan PT
[EQUIPMENT] 01 - Dashboard - Tong quan thiet bi
[MEMBER] 01 - Portal - Trang chu hoi vien
```

Role prefix cần dùng:

- `[COMMON]`
- `[ADMIN]`
- `[MANAGER]`
- `[RECEPTIONIST]`
- `[CASHIER]`
- `[PT]`
- `[EQUIPMENT]`
- `[MEMBER]`

---

## 5. Business Scope

Giao diện phải bao phủ các nhóm nghiệp vụ:

| Nhóm nghiệp vụ | UI cần thể hiện |
|---|---|
| Xác thực & phân quyền | Đăng nhập, quên mật khẩu, đăng ký nếu có, chuyển dashboard theo role, không có quyền, ma trận quyền |
| Hội viên | Danh sách, thêm/sửa, chi tiết, ngưng hoạt động, thẻ/QR, lịch sử gói, chỉ số cơ thể |
| Gói tập & thẻ | Danh sách gói, thêm/sửa, chi tiết, đăng ký, gia hạn, bảo lưu, hủy, kích hoạt thẻ |
| Check-in | QR/FaceID/thủ công, kiểm tra thẻ/gói, Access Granted/Denied, log |
| Lịch tập & PT | Lịch PT, đặt lịch, PT chấp nhận/từ chối, lộ trình, xác nhận buổi tập |
| Thanh toán & hóa đơn | Tạo thanh toán, voucher, phương thức, hóa đơn, lỗi thanh toán, hoàn/hủy giao dịch |
| Nhân sự | Danh sách nhân viên, thêm/sửa, chi tiết, khóa/ngưng tài khoản, gán vai trò |
| Báo cáo | Doanh thu, gói tập, PT, check-in, hội viên mới, xuất PDF/Excel |
| Hệ thống | Log hệ thống, sao lưu, phục hồi, xác nhận thao tác nguy hiểm |
| Thiết bị | Danh sách thiết bị, thêm/sửa, báo sự cố, lập lịch bảo trì, phiếu bảo trì, lịch sử xử lý |

---

## 6. Role-Based Sidebars

### 6.1 Admin / Quản lý

Sidebar:

- Dashboard
- Hội viên
- Gói tập
- Thẻ & Đăng ký
- Check-in
- Lịch PT
- Thanh toán
- Báo cáo
- Thiết bị
- Nhân sự
- Hệ thống
- Cài đặt

Mục đích: quản lý toàn hệ thống, doanh thu, nhân sự, phân quyền, báo cáo, thiết bị, log, backup.

### 6.2 Lễ tân / Nhân viên vận hành

Sidebar:

- Dashboard vận hành
- Hội viên
- Đăng ký gói/thẻ
- Check-in
- Lịch PT
- Thanh toán cơ bản
- Báo sự cố thiết bị
- Hỗ trợ khách

Mục đích: tiếp nhận hội viên, tạo hồ sơ, đăng ký gói, check-in, đặt lịch PT, hỗ trợ khách.

### 6.3 Thu ngân

Sidebar:

- Dashboard tài chính
- Thanh toán
- Hóa đơn
- Lịch sử giao dịch
- Gói tập
- Báo cáo cơ bản

Mục đích: tạo thanh toán, xử lý giao dịch, in/tải/gửi hóa đơn, theo dõi lỗi thanh toán.

### 6.4 PT / Huấn luyện viên

Sidebar:

- Dashboard PT
- Lịch của tôi
- Yêu cầu đặt lịch
- Hội viên phụ trách
- Lộ trình tập
- Xác nhận buổi tập
- Lương của tôi
- Hồ sơ cá nhân

Mục đích: quản lý lịch dạy, duyệt lịch, cập nhật lộ trình, xác nhận buổi tập, xem lương.

### 6.5 Quản lý thiết bị

Sidebar:

- Dashboard thiết bị
- Danh sách thiết bị
- Báo cáo sự cố
- Lịch bảo trì
- Phiếu bảo trì
- Lịch sử bảo trì

Mục đích: quản lý thiết bị, sự cố, bảo trì và lịch sử sửa chữa.

### 6.6 Hội viên

Sidebar:

- Trang chủ
- Gói tập
- Thẻ của tôi
- QR Check-in
- Đặt lịch PT
- Lịch tập của tôi
- Thanh toán/Hóa đơn
- Hồ sơ cá nhân
- Chỉ số cơ thể

Mục đích: hội viên tự xem gói, chọn gói, thanh toán, xem thẻ/QR, đặt lịch PT, xem lịch tập/hóa đơn.

---

## 7. Main Prototype Flows

### Authentication

```text
Đăng nhập → Kiểm tra tài khoản/mật khẩu → Kiểm tra quyền → Chuyển dashboard theo vai trò
```

Nhánh phụ: sai thông tin, quên mật khẩu, tài khoản bị khóa, chưa cấp quyền.

### Admin / Manager

```text
Dashboard → Quản lý hội viên/gói/thẻ → Thanh toán/Báo cáo → Nhân sự/Phân quyền → Log hệ thống/Backup
```

### Receptionist

```text
Dashboard vận hành → Tìm/Thêm hội viên → Đăng ký gói/thẻ → Chuyển thanh toán → Check-in / Đặt lịch PT / Báo sự cố
```

### Cashier

```text
Dashboard tài chính → Danh sách thanh toán → Tạo thanh toán → Áp voucher → Chọn phương thức → Thành công/Thất bại → Hóa đơn
```

### Member

```text
Đăng nhập → Trang chủ hội viên → Xem gói tập → Lọc/So sánh gói → Chọn gói → Thanh toán → Thẻ của tôi/QR → Đặt lịch PT → Xem lịch tập/Hóa đơn
```

### PT

```text
Dashboard PT → Yêu cầu đặt lịch → Chấp nhận/Từ chối → Thực hiện buổi tập → Đánh dấu hoàn thành → Hội viên xác nhận → Tính lương
```

### Check-in

```text
Quét QR/FaceID/Nhập thủ công → Kiểm tra thẻ/gói → Access Granted hoặc Access Denied → Ghi log
```

Access Denied cần có lý do: mã không hợp lệ, hết hạn, bảo lưu, chưa thanh toán, tài khoản khóa, lỗi thiết bị.

### Equipment

```text
Danh sách thiết bị → Thêm/Sửa thiết bị → Báo sự cố → Lập lịch bảo trì → Cập nhật chi phí/trạng thái → Hoàn thành → Lịch sử bảo trì
```

---

## 8. Required Screens by Module

### 8.1 Auth

- Đăng nhập
- Quên mật khẩu
- Đăng ký tài khoản nếu có
- Không có quyền truy cập

### 8.2 Dashboard theo vai trò

- Dashboard Admin/Quản lý
- Dashboard Lễ tân/Nhân viên
- Dashboard Thu ngân
- Dashboard PT
- Dashboard Thiết bị
- Trang chủ Hội viên

### 8.3 Hội viên

- Danh sách hội viên
- Thêm/Sửa hội viên
- Chi tiết hội viên
- Cập nhật chỉ số cơ thể
- Thẻ hội viên / QR Card

Actions: tìm kiếm/lọc, thêm mới, xem chi tiết, chỉnh sửa, đăng ký gói, tạm ngưng/ngưng hoạt động, xem lịch sử thanh toán, lịch sử check-in, số buổi PT, chỉ số cơ thể.

### 8.4 Gói tập & Thẻ

- Danh sách gói tập – Admin
- Thêm/Sửa gói tập
- Chi tiết gói tập
- Gói tập dành cho hội viên
- Chi tiết gói tập cho hội viên
- So sánh gói tập
- Đăng ký gói/thẻ
- Thao tác gói/thẻ
- Lịch sử gói/thẻ

Important rules:

- Admin được thêm/sửa/lưu trữ gói.
- Hội viên chỉ được xem/chọn/so sánh gói.
- Gói đã có hội viên dùng không được xóa vĩnh viễn, chỉ lưu trữ.

### 8.5 Check-in

- Điểm danh nhanh
- Lịch sử điểm danh
- Modal/State lý do Access Denied

Methods: QR, Face ID, nhập thủ công, thẻ từ nếu có.

### 8.6 Thanh toán & Hóa đơn

- Danh sách thanh toán
- Tạo thanh toán
- Hóa đơn chi tiết
- Thanh toán thất bại / Thử lại
- Hủy/Hoàn tiền giao dịch

Payment methods: tiền mặt, chuyển khoản, quẹt thẻ, VNPay.

### 8.7 Lịch PT

- Lịch PT tổng quan
- Đặt lịch PT
- Yêu cầu đặt lịch chờ PT
- Hồ sơ huấn luyện viên
- Lộ trình tập luyện
- Xác nhận buổi tập
- Tính lương PT / Lương của tôi

Important rule: chỉ buổi `Hoàn thành + Hội viên đã xác nhận` mới được tính lương PT.

### 8.8 Thiết bị

- Dashboard thiết bị
- Danh sách thiết bị
- Thêm/Sửa thiết bị
- Báo cáo sự cố thiết bị
- Lập lịch bảo trì
- Chi tiết phiếu bảo trì
- Lịch sử bảo trì

Statuses: hoạt động, đang kiểm tra, đang bảo trì, hỏng, ngưng hoạt động, hoàn thành bảo trì.

### 8.9 Nhân sự & Phân quyền

- Danh sách nhân viên
- Thêm/Sửa nhân viên
- Chi tiết nhân viên
- Vai trò & Phân quyền
- Thêm/Sửa vai trò

Permissions: xem, thêm, sửa, xóa, toàn quyền.

### 8.10 Báo cáo & Hệ thống

- Dashboard báo cáo
- Chi tiết báo cáo doanh thu
- Báo cáo hiệu suất PT
- Log hệ thống
- Sao lưu & khôi phục
- Cài đặt chung / Tài khoản / Thông báo

---

## 9. Required Shared Components

AI cần tạo hoặc dùng lại:

- Sidebar component cho từng role
- Topbar component
- Statistic card
- Data table
- Filter bar
- Form field
- Dropdown
- Date picker
- File upload
- Tabs
- Calendar
- Status badges
- Action menu
- Confirmation modal
- Toast
- Empty state
- Loading state
- Error state

---

## 10. Status Badge Vocabulary

Dùng thống nhất:

- Đang hoạt động
- Tạm ngưng
- Đã lưu trữ
- Sắp hết hạn
- Hết hạn
- Bảo lưu
- Chờ xác nhận
- Đã xác nhận
- Đã từ chối
- Hoàn thành
- Đã hủy
- Thành công
- Thất bại
- Đang xử lý
- Đã thanh toán
- Chưa thanh toán
- Chưa trả
- Đã trả
- Đang bảo trì
- Hỏng
- Ngưng hoạt động

---

## 11. Required Modals and States

### Confirmation Modals

- Xác nhận xóa/ngưng hoạt động hội viên
- Xác nhận lưu trữ gói tập
- Xác nhận hủy gói tập
- Xác nhận hoàn tiền
- Xác nhận hủy giao dịch
- Xác nhận hủy lịch PT
- PT từ chối lịch
- Xác nhận khóa tài khoản
- Xác nhận phục hồi dữ liệu
- Xác nhận hoàn thành bảo trì

### Error / Warning States

- Không có quyền
- Không tìm thấy dữ liệu
- Dữ liệu không hợp lệ
- Trùng email/SĐT/mã
- Thanh toán thất bại
- Voucher không hợp lệ
- Mã QR không hợp lệ
- Gói hết hạn
- Thẻ đang bảo lưu
- Chưa thanh toán
- Tài khoản bị khóa
- PT đã kín lịch
- Hội viên hết số buổi PT

### Success / Loading States

- Đang tải dữ liệu
- Đang lưu
- Lưu thành công
- Thanh toán thành công
- Xuất file thành công
- Gửi yêu cầu thành công

---

## 12. Final Prototype Checklist

AI cần tạo prototype/flow theo các hướng:

```text
Login → Dashboard theo role
Admin Dashboard → Members List → Member Detail → Register Membership → Create Payment → Invoice Detail → Membership Card/QR
Member Portal → Package Browse → Package Detail/Compare → Register Membership → Payment → My Card
Check-in → Access Granted/Denied → Check-in Logs
Book PT Session → Pending Request → PT Accept/Reject → Confirmed Session → Completed → Member Confirmation → PT Salary
Equipment List → Report Issue → Schedule Maintenance → Maintenance Detail → Completed → Maintenance History
Staff List → Add/Edit Staff → Assign Role → Roles & Permissions
Reports → Export PDF/Excel success state
```

---

## 13. Final Quality Checklist

Trước khi xem là hoàn thành, kiểm tra:

- Mỗi role có sidebar riêng.
- Admin-only page không xuất hiện trong sidebar của Hội viên.
- Hội viên không có quyền edit/delete/archive gói.
- Lễ tân không thấy log hệ thống, backup, phân quyền sâu.
- Thu ngân tập trung vào thanh toán/hóa đơn.
- PT tập trung vào lịch, yêu cầu đặt lịch, hội viên phụ trách, xác nhận buổi tập, lương.
- Equipment Staff tập trung vào thiết bị, sự cố, bảo trì.
- Mỗi page active đúng sidebar item.
- Mỗi form có validation state.
- Mỗi bảng có empty state.
- Mỗi thao tác nguy hiểm có confirm modal.
- Mỗi flow chính có đường prototype rõ ràng.
- Tất cả text UI là tiếng Việt.
- Thuật ngữ thống nhất: Hội viên, Gói tập, Thẻ, Điểm danh, Huấn luyện viên/PT, Thanh toán, Thiết bị, Nhân sự.
