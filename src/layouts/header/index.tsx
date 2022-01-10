import { defineComponent } from 'vue'
import { useRoute, RouteRecordName } from 'vue-router'
import Icon from '@/components/Icon'
import { layoutStore } from '@/store/system/layout'
import { asyncRoute } from '@/router'
import { AppRouteRecordRaw } from '@/router/types'

export default defineComponent({
  // props: {},
  emits: [],
  setup() {
    const store = layoutStore()
    const route = useRoute()
    // store.collapseAction()
    console.log(route.meta)

    function collapseClick() {
      store.collapseAction()
    }
    const getParentHandler = (asyncRoute: AppRouteRecordRaw[], name: RouteRecordName) => {
      let parents: AppRouteRecordRaw = asyncRoute[0]
      const getParent = (
        asyncRoute: AppRouteRecordRaw[],
        name: RouteRecordName,
        parent: AppRouteRecordRaw
      ) => {
        asyncRoute.forEach((v) => {
          if (v.name === name) {
            parents = parent
          } else {
            v.children && getParent(v.children, name, v)
          }
        })
      }
      getParent(asyncRoute, name, parents)
      return parents
    }

    const renderBreadcrumb = () => {
      const pathName = route.name
      const parentNode = pathName ? getParentHandler(asyncRoute, pathName) : asyncRoute[0]
      const child = parentNode.children!
      return (
        <>
          <a-breadcrumb-item
            v-slots={{
              overlay: () => {
                return (
                  <a-menu>
                    {child.map((v) => {
                      return (
                        <a-menu-item>
                          <router-link to={`${parentNode.path}/${v.path}`}>
                            {v.meta.title}
                          </router-link>
                        </a-menu-item>
                      )
                    })}
                  </a-menu>
                )
              }
            }}
          >
            <a>{parentNode.meta.title}</a>
          </a-breadcrumb-item>
          <a-breadcrumb-item>{route.meta.title}</a-breadcrumb-item>
        </>
      )
    }

    return () => (
      <>
        <div class={['lx-head-icon']} onClick={collapseClick}>
          <Icon
            iconName={store.collapse ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'}
            size={16}
          ></Icon>
        </div>
        <a-breadcrumb>{renderBreadcrumb()}</a-breadcrumb>
      </>
    )
  }
})
