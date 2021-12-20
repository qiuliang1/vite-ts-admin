import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

import '@/styles/index.scss'

export default defineComponent({
  setup () {
    return () => <RouterView />
  }
})
