import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
// import {Antd} from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.min.css'

import '@/styles/index.scss'
import { createI18n } from 'vue-i18n'
import 'virtual:windi.css'
import App from './App'

const i18n = createI18n({
  locale: 'zh',
  messages: {
    en: {},
    zh: {}
  }
})

createApp(App).use(router).use(createPinia()).use(i18n).mount('#app')
