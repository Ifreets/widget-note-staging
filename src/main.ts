// import function
import { loadLanguage } from './services/language'
import { loadEnv } from './services/core/env'
import { loadApp } from './services/core/app'

// Import vue
import { createApp } from 'vue'
import App from './App.vue'
import WIDGET from 'bbh-chatbox-widget-js-sdk'

//import css
import './style.css'

const APP = createApp(App)

/** hàm load các hàm cài đặt */
async function startApp() {
  try {
    // load i18n
    loadLanguage(APP)
    // load env
    await loadEnv()
    // cài secret key cho WIDGET
    WIDGET.load(globalThis.$env.secret_key)
    // dùng store
    loadApp(APP)
    APP.mount('#app')
  } catch (error) {
    console.error('Error starting app:', error)
  }
}

startApp()
