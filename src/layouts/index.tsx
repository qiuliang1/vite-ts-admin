import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import Sider from './sider'
import Header from './header'
import PageLayout from './page'
import Tabs from './tabs'
import { Layout, LayoutSider, LayoutHeader, LayoutContent } from 'ant-design-vue'
import { layoutStore } from '@/store/system/layout'
import './_style.scss'
export default defineComponent({
  // props: {},
  //   emits: [],
  // components: {
  // },
  setup() {
    const store = layoutStore()
    const route = useRoute()
    const layoutSider = {
      collapsedWidth: 48
    }
    return () => (
      <Layout>
        <LayoutSider breakpoint="lg" collapsed={store.collapse} {...layoutSider}>
          <Sider />
        </LayoutSider>
        <Layout>
          <LayoutHeader class="lx-layout-header">
            <Header></Header>
          </LayoutHeader>
          <LayoutContent>
            <Tabs isExtra tabItem={route} />
            <PageLayout></PageLayout>
          </LayoutContent>
        </Layout>
      </Layout>
    )
  }
})
