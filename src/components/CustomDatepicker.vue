<template>
  <div class="flex gap-1">
    <VueDatePicker
      :disabled="props.frequency_selected === 'EVERY_DAY'"
      v-model="date_value"
      input-class-name="border-2 outline-none h-full text-sm text-gray-500 px-3"
      teleport-center
      :enable-time-picker="false"
      :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']"
      :format-locale="vi"
      :min-date="new Date()"
      hide-input-icon
      :format="
        props.frequency_selected === 'EVERY_WEEK' ? customFormat : 'dd/MM/yyyy'
      "
      menu-class-name="text-sm"
      :clearable="false"
      auto-apply
    >
    </VueDatePicker>
    <div
      class="border-2 px-3 rounded outline-none h-full flex items-center justify-center cursor-pointer relative"
      @click="openTimePicker"
    >
      {{ time_value.hour }}:{{ time_value.minute }}
    </div>
    <Teleport to="body">
      <div
        ref="time_picker"
        tabindex="0"
        @focusout="is_show_time_picker = false"
      >
        <div
          v-if="is_show_time_picker"
          class="fixed flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 rounded"
        >
          <p class="text-center border-b-2 py-2">
            {{ timestampToDate(date_value) }}
          </p>
          <div class="flex">
            <ul
              class="max-h-48 overflow-auto custom-scrollbar text-center w-28"
            >
              <li
                v-for="item in hours"
                :key="item"
                class="cursor-pointer py-1"
                :class="
                  item === time_value.hour
                    ? 'bg-[#ea580c] text-white font-medium active'
                    : 'hover:bg-gray-200'
                "
                @click="time_value.hour = item"
              >
                {{ item }}
              </li>
            </ul>
            <ul
              class="max-h-48 overflow-auto custom-scrollbar text-center w-28"
            >
              <li
                v-for="item in minutes"
                :key="item"
                class="cursor-pointer py-1"
                :class="
                  item === time_value.minute
                    ? 'bg-[#ea580c] text-white font-medium active'
                    : 'hover:bg-gray-200'
                "
                @click="time_value.minute = item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { vi } from 'date-fns/locale'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { computed, nextTick, ref, watch } from 'vue'
import { scrollToSelected } from '@/services/scroll'
import { timestampToDate } from '@/services/format/date'

const props = defineProps<{
  frequency_selected: string
}>()

const date_value = defineModel<number>('date', {
  default: 0,
})
const time_value = defineModel<{ hour: number; minute: number }>('time', {
  default: { hour: 0, minute: 0 },
})

const time_picker = ref<HTMLElement>()

const dayInWeek = [
  'Chủ nhật',
  'Thứ hai',
  'Thứ ba',
  'Thứ tư',
  'Thứ năm',
  'Thứ sáu',
  'Thứ bảy',
]

const customFormat = (date: Date) => {
  return `${dayInWeek[date.getDay()]}`
}

/** hiện modal chọn thời gian */
const is_show_time_picker = ref<boolean>(false)

const hours = computed(() => {
  let arr = []
  for (let i = 0; i < 24; i++) {
    arr.push(i)
  }
  return arr
})

const minutes = computed(() => {
  let arr = []
  for (let i = 0; i < 60; i++) {
    arr.push(i)
  }
  return arr
})

watch(
  () => time_value.value.hour,
  (newValue, oldValue) => {
    if (newValue === oldValue) return
    nextTick(() => {
      scrollToSelected(200, time_picker)
    })
  }
)
watch(
  () => time_value.value.minute,
  (newValue, oldValue) => {
    if (newValue === oldValue) return
    nextTick(() => {
      is_show_time_picker.value = false
    })
  }
)
watch(is_show_time_picker, (newValue) => {
  if (!newValue) return
  nextTick(() => {
    scrollToSelected(0, time_picker)
  })
})

function openTimePicker() {
  is_show_time_picker.value = true
  time_picker.value?.focus()
}
</script>
