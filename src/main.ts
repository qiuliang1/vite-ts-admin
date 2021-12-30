import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App'

createApp(App).use(router).use(createPinia()).mount('#app')
