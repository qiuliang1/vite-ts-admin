import { defineComponent, computed, h, Transition, KeepAlive, unref, VNode } from 'vue'
import { RouterView, _RouteLocationBase } from 'vue-router'

export default defineComponent({
  //   props: {},
  emits: [],
  // components: {},
  setup() {
    interface IRouteView {
      Component: VNode
      route: _RouteLocationBase
    }
    const getCaches = computed<string[]>(() => {
      return []
    })

    return () => (
      <RouterView
        v-slots={{
          default: (prop: IRouteView) => {
            return (
              <Transition name="fade-transform" mode="out-in" appear={true}>
                <KeepAlive include={unref(getCaches)}>{h(prop.Component)}</KeepAlive>
              </Transition>
            )
          }
        }}
      ></RouterView>
    )
  }
})
