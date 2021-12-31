import { defineComponent } from 'vue'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import Icon from '@/components/Icon'
import { layoutStore } from '@/store/system/layout'

export default defineComponent({
  // props: {},
  emits: [],
  // components: {},
  setup() {
    const store = layoutStore()
    // store.collapseAction()
    console.log(store.collapse)

    function collapseClick() {
      store.collapseAction()
    }

    return () => (
      <>
        <div class={['lx-head-icon', store.collapse ? 'lx-rotate' : '']} onClick={collapseClick}>
          <Icon iconName="Fold" size={26}></Icon>
        </div>
        <ElBreadcrumb separator="/">
          <ElBreadcrumbItem to={{ path: '/' }}>Dashboard</ElBreadcrumbItem>
          <ElBreadcrumbItem to={{ path: '/' }}>analysis</ElBreadcrumbItem>
        </ElBreadcrumb>
      </>
    )
  }
})
