import { defineComponent, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { Menu, SubMenu, MenuItem } from 'ant-design-vue'
import Icon from '@/components/Icon'
import { layoutStore } from '@/store/system/layout'
import { asyncRoute } from '@/router'
import { AppRouteRecordRaw } from '@/router/types'
import logo from '@/assets/logo.png'

export default defineComponent({
  // props: {},
  emits: [],
  setup() {
    const store = layoutStore()
    const router = useRouter()
    const route = useRoute()

    const menuConfig = {
      openKeys: [`/${route.path.split('/')[1]}`]
    }

    watch(route, (newV) => {
      menuConfig.openKeys = [`/${newV.path.split('/')[1]}`]
    })

    const routeTo = ({ key }: { key: string | number }) => {
      router.push({
        path: key as string
      })
    }

    const LogoRender = () => {
      return (
        <div class="lx-logo">
          <img class="lx-logo-img" src={logo} />
          <div class={{ 'lx-logo-title': true, hide: store.collapse }}>LX Admin</div>
        </div>
      )
    }

    function menuHandler(route: AppRouteRecordRaw[], path: string) {
      return route.map((v) => {
        if (v.meta.hideChildrenInMenu && v.children) {
          const child = v.children[0]
          return (
            <MenuItem key={`${v.path}/${child.path}`}>
              <Icon iconName="icon-yichgangtongji" />
              <span>{child.meta.title}</span>
            </MenuItem>
          )
        } else if (v.children && v.children.length > 0) {
          return (
            <SubMenu
              key={v.path}
              v-slots={{
                title: () => {
                  return (
                    <>
                      <Icon iconName="icon-yuebao" />
                      <span>{v.meta.title}</span>
                    </>
                  )
                }
              }}
            >
              {menuHandler(v.children, v.path)}
            </SubMenu>
          )
        } else {
          return (
            <MenuItem key={`${path}/${v.path}`}>
              <Icon iconName="icon-yunweigongsi" />
              <span>{v.meta.title}</span>
            </MenuItem>
          )
        }
      })
    }

    return () => (
      <>
        <LogoRender />
        <Menu
          onClick={routeTo}
          selectedKeys={[route.path]}
          theme="dark"
          mode="inline"
          {...menuConfig}
        >
          {menuHandler(asyncRoute, '')}
        </Menu>
      </>
    )
  }
})
