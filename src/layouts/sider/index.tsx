import { defineComponent, VNodeChild } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { Menu, SubMenu, MenuItem } from 'ant-design-vue'
import Icon from '@/components/Icon'
import { layoutStore } from '@/store/system/layout'
import { asyncRoute } from '@/router'
import { AppRouteRecordRaw } from '@/router/types'

interface MenuInfo {
  key: string
  keyPath: string[]
  item: VNodeChild
  domEvent: MouseEvent
}

export default defineComponent({
  // props: {},
  emits: [],
  setup() {
    const store = layoutStore()
    const router = useRouter()
    const route = useRoute()

    const menuConfig = {
      theme: 'dark',
      mode: 'inline',
      openKeys: [`/${route.path.split('/')[1]}`]
    }

    const routeTo = ({ key }: MenuInfo) => {
      router.push({
        path: key
      })
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
            <MenuItem key={`${v.path}${child.path}`}>
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
          class="el-menu-vertical-custom"
          onClick={routeTo}
          selectedKeys={[route.path]}
          {...menuConfig}
        >
          {menuHandler(asyncRoute, '')}
        </Menu>
      </>
    )
  }
})
