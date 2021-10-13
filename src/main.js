// Import vue
import Vue from 'vue'
import App from './App.vue'
import dateFormat from 'dateformat'

// * Import css
// import './../libraries/css/normalize.css'
// import './../libraries/css/skeleton.css'
import './../libraries/css/custom.scss'

Vue.config.productionTip = false

Vue.filter('convert_time', function (value) {
    if(!value) return ''
    return dateFormat(new Date(value), 'HH:MM - dd/mm/yyyy')
})

Vue.filter('time_more', function (value) {

    if (!value) return '' 
    if (value < Date.now()) return ''

    var seconds = Math.floor((value - Date.now()) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " năm nữa";
    }

    interval = seconds / 2592000;

    if (interval > 1) {
        return Math.floor(interval) + " tháng nữa";
    }

    interval = seconds / 86400;

    if (interval > 1) {
        return Math.floor(interval) + " ngày nữa";
    }

    interval = seconds / 3600;

    if (interval > 1) {
        return Math.floor(interval) + " tiếng nữa";
    }

    interval = seconds / 60;

    if (interval > 1) {
        return Math.floor(interval) + " phút nữa";
    }

    return Math.floor(seconds) + " giây nữa";
})

new Vue({
  render: h => h(App),
}).$mount('#app')
