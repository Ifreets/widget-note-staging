<template>
  <div id="app">
    <DashBoard v-if="!active_app" />
    <ActiveWidget v-if="active_app" />
    <Loading type="FULL" v-if="appStore.is_loading" />
  </div>
</template>

<script setup lang="ts">
// * import function
import { Toast } from '@/services/toast'
import { queryString } from '@/services/helper'
import { useAppStore, useCommonStore } from '@/services/stores'
import { decodeClientV2 } from '@/services/api/chatbot'

// * import library
import WIDGET from 'bbh-chatbox-widget-js-sdk'
import { onMounted, ref } from 'vue'

// * import component
import DashBoard from '@/components/DashBoard.vue'
import ActiveWidget from '@/components/ActiveWidget.vue'
import Loading from '@/components/Loading.vue'

// let url_string = window.location.href
// let url = new URL(url_string)
// globalThis.access_token = url.searchParams.get('access_token')

// * store
const appStore = useAppStore()
const commonStore = useCommonStore()

// * khởi tạo hàm thông báo
const $toast = new Toast()

/** hàm check active widget */
const active_app = ref<boolean>(false)

onMounted(() => {
  // hàm kiểm tra xem đã kích hoạt chưa và chuyển đến màn tương ứng
  activeApp()
  // lắng nghe event từ merchant khi chuyển đoạn chat
  WIDGET.onEvent(() => {
    // ghi lại thông tin khách hàng mới
    getDataClient()
  })
})

/** hàm tự động tạo ghi chú */
function autoCreate(){
  let param_date = queryString('datetime') || ''
  let note_content = queryString('note') || ''

  const partner_token = queryString('partner_token')

  if (partner_token) {
    param_date =
      commonStore?.data_client?.public_profile?.ai?.[0]?.ctas?.schedule_appointment?.datetime?.toString() ||
      ''
    note_content =
      commonStore?.data_client?.public_profile?.ai?.[0]?.ctas
        ?.schedule_appointment?.input_message || ''
  }

  if(!note_content && !param_date) return

  /** hợp lệ của thời gian */
  let is_date_valid = param_date

  if (note_content || is_date_valid) {
    //chuyển màn tạo ghi chú
    appStore.tab_selected = 'CREATE_NEW'
    appStore.is_auto_create = true
  }
}

/** hàm lấy thông tin khách hàng */
async function getDataClient() {
  try {
    //bật loading
    commonStore.is_loading_full_screen = true

    await decodeClient()

    //tắt loading
    commonStore.is_loading_full_screen = false
  } catch (error) {
    console.log('getDataClient', error)
    //tắt loading
    commonStore.is_loading_full_screen = false
  }
}

/** hàm active widget */
async function activeApp() {
  try {
    //bật loading
    commonStore.is_loading_full_screen = true

    await decodeClient()

    //nếu thành công thì không cho vào màn kích hoạt
    active_app.value = false

    autoCreate()

    //tắt loading
    commonStore.is_loading_full_screen = false
  } catch (error) {
    console.log('activeApp', error)

    // thông báo nếu scret key sai
    if (error === 'WRONG_SECRET_KEY') {
      $toast.error(
        'Secret key của ghi chú sai, vui lòng liên hệ với kỹ thuật viên'
      )
    }

    // nếu không lấy thành công thì chuyển sang màn kích hoạt
    active_app.value = true

    //tắt loading
    commonStore.is_loading_full_screen = false
  }
}

async function decodeClient(){
  try {
    // lấy thông tin khách hàng
    const partner_token = queryString('partner_token')

    console.log('partner_token', partner_token);
    

    if(partner_token){
      const data = await decodeClientV2({
        access_token: queryString('partner_token'),
        client_id: queryString('client_id'),
        message_id: queryString('message_id'),
        secret_key: $env.secret_key
      })
      commonStore.data_client = data.data
    }else{
      commonStore.data_client = await WIDGET.decodeClient()
    } 
  }catch (error) {
    console.log('getDataClient', error)
  }
}

</script>

<style lang="scss">
#app {
  font-family: Arial;
}
</style>
