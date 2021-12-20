import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App'
import 'element-plus/theme-chalk/index.css'

createApp(App).use(router).use(createPinia()).mount('#app')
