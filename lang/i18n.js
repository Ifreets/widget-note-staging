import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

// lang
import viLang from './vietnamese.js'
import enLang from './english.js'
import thLang from './thai.js'

const vi = viLang
const vn = viLang
const en = enLang
const us = enLang
const th = thLang

/* get lang from native app */
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const getLang = () => {
    let lang = getParameterByName('locale') || localStorage.getItem('lang') || 'vi'
    localStorage.setItem('lang', lang)
    return lang 
}

export default new VueI18n({
    locale: getLang(),
    messages: {
        vi,
        vn,
        en,
        us,
        th,
    },
    fallbackLocale: 'vi'
})