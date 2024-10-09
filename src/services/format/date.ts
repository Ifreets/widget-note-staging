import { i18n } from "@/lang/i18n"
import { dayInWeek } from "@/services/constant/create_note"
import { isToday, isTomorrow, isYesterday } from "date-fns"

/** chuyển thời gian dạng timstamp sang HH:mm  - DD/MM/YYYY */
export function convertTimeList(value: string): string {
  // kiểm tra giá trị truyền vào có tồn tại hay không
  if (!value) return ''
  // lấy giá trị của ngày được truyền vào
  const date = new Date(value)

  // lấy giờ của thời gian truyền vào
  const hours = ('0' + date.getHours()).slice(-2)
  // lấy phút của thời gian truyền vào
  const minutes = ('0' + date.getMinutes()).slice(-2)
  // lấy ngày của thời gian truyền vào
  const day = ('0' + date.getDate()).slice(-2)
  // lấy tháng của thời gian truyền vào
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  // lấy năm của thời gian truyền vào
  const year = date.getFullYear()
  //trả về định dạng HH:mm - DD/MM/YYYY
  return `${hours}:${minutes} - ${stringOfDay(date)}, ${day}/${month}/${year}`
}

/** hàm chuyển đổi timestamp sang string date dạng DD/MM/YYYY */
export function timestampToDate(value: number): string {
  if (!value) return ''
  // lấy giá trị date của ngày được truyền vào
  const date = new Date(value)
  // lấy ngày của thời gian truyền vào
  const day = ('0' + date.getDate()).slice(-2)
  // lấy tháng của thời gian truyền vào
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  // lấy năm của thời gian truyền vào
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export function stringOfDay(date:Date):string{
  /** chuỗi đứng trước ngày tháng năm */
  let before_string = ''

  /** hôm nay */
  if(isToday(date)){
    before_string = i18n.global.t('today')
  }

  /** hôm qua */
  if(isYesterday(date)){
    before_string = i18n.global.t('yesterday')
  }

  /** ngày mai */
  if(isTomorrow(date)){
    before_string = i18n.global.t('tomorrow')
  }

  /** hiện thứ trong tuần */
  if(!before_string){
    before_string = dayInWeek[date.getDay()]
  }
  return before_string
}