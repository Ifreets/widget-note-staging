/** kiểu dữ liệu của một ghi chú */
export interface INote {
  /** biến check có phải đặt lịch không */
  scheduled?: boolean
  /** tần suất đặt lịch */
  frequency?: string
  /** hoàn thành chưa */
  finished?: boolean
  /** chưa biết */
  watched?: boolean
  /** chưa biết */
  is_remove?: boolean
  /** chưa biết */
  type?: string
  /** id của ghi chú */
  _id?: string
  /** id của page đang chọn */
  fb_page_id?: string
  /** id của khách đang chọn */
  fb_client_id?: string
  /** chưa biết */
  label?: string
  /** nội dung ghi chú */
  content?: string
  /** thời gian đặt lịch */
  schedule_time?: number
  /** id của nhân viên đang đăng nhập*/
  fb_staff_id?: string
  /** tên của nhân viên đang đăng nhập */
  staff_name?: string
  /** tháng đặt lịch */
  schedule_month?: number
  /** ngày đặt lịch */
  schedule_day?: number
  /** giờ đặt lịch */
  schedule_hour?: number
  /** phút đặt lịch */
  schedule_minute?: number
  /** tuần đặt lịch */
  schedule_week?: number
  /** năm đặt lịch */
  schedule_year?: number
  /** ngày tạo ghi chú */
  createdAt?: string
  /** ngày cập nhật ghi chú */
  updatedAt?: string
}
