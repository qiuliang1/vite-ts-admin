import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
    props: {},
    emits: [],
    components: {},
    setup(props, ctx) {
        return () => (
            <RouterView>

            </RouterView>
        )
    }
})