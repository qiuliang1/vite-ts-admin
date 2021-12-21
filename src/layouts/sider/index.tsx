import { defineComponent } from 'vue'
import { ElMenu, ElMenuItem } from 'element-plus'

import Icon from '@/components/Icon'
// import './_style.scss'

export default defineComponent({
  // props: {},
  emits: [],
  //   components: {},
  setup() {
    // props, ctx
    return () => (
      <ElMenu defaultActive="1">
        <ElMenuItem index="1">
          <Icon iconName="Document" />
          <span>Navigator One</span>
        </ElMenuItem>
        <ElMenuItem index="2">
          <Icon iconName="Document" />
          <span>Navigator One</span>
        </ElMenuItem>
      </ElMenu>
    )
  }
})
