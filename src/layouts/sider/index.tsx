import { defineComponent } from 'vue'
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import { useRoute } from 'vue-router'

import Icon from '@/components/Icon'
import { layoutStore } from '@/store/system/layout'
import { asyncRoute } from '@/router'
import { AppRouteRecordRaw } from '@/router/types'

export default defineComponent({
  // props: {},
  emits: [],
  //   components: {},
  setup() {
    const store = layoutStore()
    const route = useRoute()

    const menuConfig = {
      backgroundColor: '#61a1ff',
      textColor: '#ffffff',
      activeTextColor: '#000',
      router: true,
      defaultActive: route.path
    }

    const LogoRender = () => {
      return (
        <div class="lx-logo">
          <img class="lx-logo-img" src="https://vvbin.cn/next/assets/logo.63028018.png" />
          <div class={{ 'lx-logo-title': true, hide: store.collapse }}>LXAdmin</div>
        </div>
      )
    }

    function menuHandler(route: AppRouteRecordRaw[], path: string) {
      return route.map((v) => {
        if (v.meta.hideChildrenInMenu && v.children) {
          const child = v.children[0]
          return (
            <ElMenuItem
              index={`${v.path}/${child.path}`}
              v-slots={{ title: () => child.meta.title }}
            >
              <Icon iconName="Document" />
            </ElMenuItem>
          )
        } else if (v.children && v.children.length > 0) {
          return (
            <ElSubMenu
              index={v.path}
              v-slots={{
                title: () => {
                  return (
                    <>
                      <Icon iconName="Document" /> {v.meta.title}
                    </>
                  )
                }
              }}
            >
              {menuHandler(v.children, v.path)}
            </ElSubMenu>
          )
        } else {
          return (
            <ElMenuItem index={`${path}/${v.path}`} v-slots={{ title: () => v.meta.title }}>
              <Icon iconName="Document" />
            </ElMenuItem>
          )
        }
      })
    }

    return () => (
      <>
        <LogoRender />
        <ElMenu class="el-menu-vertical-custom" collapse={store.collapse} {...menuConfig}>
          {menuHandler(asyncRoute, '')}
        </ElMenu>
      </>
    )
  }
})
