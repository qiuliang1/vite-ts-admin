import { defineComponent } from 'vue'
import Sider from './sider'
import Header from './header'
import PageLayout from './page'
import { layoutStore } from '@/store/system/layout'

export default defineComponent({
  // props: {},
  //   emits: [],
  // components: {
  // },
  setup() {
    const store = layoutStore()
    return () => (
      <a-layout>
        <a-layout-sider breakpoint="lg" collapsed={store.collapse}>
          <Sider />
        </a-layout-sider>
        <a-layout>
          <a-layout-header style={{ background: '#fff', padding: 0 }}>
            <Header></Header>
          </a-layout-header>
          <a-layout-content>
            <PageLayout></PageLayout>
          </a-layout-content>
        </a-layout>
      </a-layout>
    )
  }
})
