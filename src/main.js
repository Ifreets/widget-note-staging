// Import vue
import Vue from 'vue'
import App from './App.vue'
import dateFormat from 'dateformat'
import Toasted from 'vue-toasted';
import i18n from './../lang/i18n'

// * Import css
// import './../libraries/css/normalize.css'
// import './../libraries/css/skeleton.css'
import './../libraries/css/custom.scss'

Vue.config.productionTip = false

Vue.use(Toasted)

Vue.filter('convert_time', function (value) {
    if(!value) return ''
    return dateFormat(new Date(value), 'HH:MM - dd/mm/yyyy')
})

new Vue({
    i18n,
    render: h => h(App),
}).$mount('#app')
