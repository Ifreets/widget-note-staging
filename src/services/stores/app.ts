import { INote } from '@/interface/note'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useAppStore = defineStore('app_store', () => {
  /** loading toàn trang */
  const is_loading = ref<boolean>(false)
  /** nội dung ghi chú */
  const note_content = ref<string>('')
  /** tab đang được chọi*/
  const tab_selected = ref<string>('NOTE_LIST')
  /** danh sách ghi chú */
  const note_list = ref<INote[]>([])
  /** index của note đang sửa */
  const note_index = ref<number>(-1) // bằng -1 là tạo mới

  return {
    is_loading,
    note_content,
    tab_selected,
    note_list,
    note_index,
  }
})
