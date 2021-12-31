import { defineComponent } from 'vue'
import { ElContainer, ElHeader, ElAside, ElMain } from 'element-plus'
import Sider from './sider'
import Header from './header'
import PageLayout from './page'

export default defineComponent({
  // props: {},
  //   emits: [],
  components: {
    PageLayout,
    ElContainer,
    ElHeader,
    ElAside,
    ElMain
  },
  setup() {
    return () => (
      <ElContainer>
        <ElAside>
          <Sider />
        </ElAside>
        <ElContainer>
          <ElHeader>
            <Header></Header>
          </ElHeader>
          <ElMain>
            <PageLayout></PageLayout>
          </ElMain>
        </ElContainer>
      </ElContainer>
    )
  }
})
