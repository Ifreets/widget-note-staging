/** chuyển thời gian dạng timstamp sang HH:mm  - DD/MM/YYYY */
export function convertTimeList(value: number) {
  if (!value) return ''
  const date = new Date(value)
  const hours = ('0' + date.getHours()).slice(-2)
  const minutes = ('0' + date.getMinutes()).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const month = ('0' + (date.getMonth() + 1)).slice(-2) // Month is zero-indexed
  const year = date.getFullYear()
  return `${hours}:${minutes} - ${day}/${month}/${year}`
}
