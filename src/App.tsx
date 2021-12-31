import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'

import 'element-plus/theme-chalk/index.css'
import '@/styles/index.scss'

export default defineComponent({
  setup() {
    return () => (
      <ElConfigProvider button={{ autoInsertSpace: true }}>
        <RouterView />
      </ElConfigProvider>
    )
  }
})
