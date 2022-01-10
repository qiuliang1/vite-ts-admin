import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
// import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { createI18n } from 'vue-i18n'
import App from './App'

const i18n = createI18n({
  locale: 'zh',
  messages: {
    en: {},
    zh: {}
  }
})

createApp(App).use(router).use(createPinia()).use(i18n).mount('#app')
