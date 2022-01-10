import { defineComponent } from 'vue'
import Sider from './sider'
import Header from './header'
import PageLayout from './page'
import { Layout, LayoutSider, LayoutHeader, LayoutContent } from 'ant-design-vue'
import { layoutStore } from '@/store/system/layout'

export default defineComponent({
  // props: {},
  //   emits: [],
  // components: {
  // },
  setup() {
    const store = layoutStore()
    return () => (
      <Layout>
        <LayoutSider breakpoint="lg" collapsed={store.collapse}>
          <Sider />
        </LayoutSider>
        <Layout>
          <LayoutHeader style={{ background: '#fff', padding: 0 }}>
            <Header></Header>
          </LayoutHeader>
          <LayoutContent>
            <PageLayout></PageLayout>
          </LayoutContent>
        </Layout>
      </Layout>
    )
  }
})
