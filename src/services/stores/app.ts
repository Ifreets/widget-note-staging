import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useAppStore = defineStore('app_store', () => {
  /** nội dung ghi chú */
  const note_content = ref<string>('')
  /** tab đang được chọi*/
  const tab_selected = ref<string>('NOTE_LIST')

  return {
    note_content,
    tab_selected,
  }
})
