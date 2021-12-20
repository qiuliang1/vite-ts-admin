import { defineComponent } from 'vue'
import { ElContainer, ElAside, ElHeader, ElMain } from 'element-plus'
import Sider from './sider'

export default defineComponent({
    // props: {},
    emits: [],
    components: {},
    setup(props, ctx) {
        return () => (
            <ElContainer>
                <ElAside>
                    <Sider />
                </ElAside>
                <ElContainer>
                    <ElHeader></ElHeader>
                    <ElMain>
                        <slot></slot>
                    </ElMain>
                </ElContainer>
            </ElContainer>
        )
    }
})