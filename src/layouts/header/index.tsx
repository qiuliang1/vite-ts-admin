import { defineComponent } from 'vue'
import { useRoute, RouteRecordName } from 'vue-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  Menu,
  // MenuItem,
  MenuDivider,
  Avatar,
  Tooltip,
  Dropdown
} from 'ant-design-vue'
import Icon from '@/components/Icon'
import { layoutStore } from '@/store/system/layout'
import { loginStore } from '@/store/login'
import { asyncRoute } from '@/router'
import { AppRouteRecordRaw } from '@/router/types'
import { useFullscreen } from '@vueuse/core'
interface IUser {
  src?: string
}

type MenuEvent = 'logout' | 'doc' | 'lock' | string | number

export default defineComponent({
  // props: {},
  emits: [],
  setup() {
    const store = layoutStore()
    const lgStore = loginStore()
    const route = useRoute()
    // store.collapseAction()

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
          <BreadcrumbItem
            v-slots={{
              overlay: () => {
                return (
                  <Menu>
                    {child.map((v) => {
                      return (
                        <Menu.Item>
                          <router-link to={`${parentNode.path}/${v.path}`}>
                            {v.meta.title}
                          </router-link>
                        </Menu.Item>
                      )
                    })}
                  </Menu>
                )
              }
            }}
          >
            <a>{parentNode.meta.title}</a>
          </BreadcrumbItem>
          <BreadcrumbItem>{route.meta.title}</BreadcrumbItem>
        </>
      )
    }

    const UserRenderer = ({ src }: IUser) => {
      function handleClick(e: { key: MenuEvent }) {
        switch (e.key) {
          case 'logout':
            lgStore.logout()
        }
      }

      return (
        <Dropdown
          v-slots={{
            overlay: () => (
              <Menu onClick={handleClick}>
                <Menu.Item key={'doc'}>
                  <span class="flex items-center">
                    <Icon iconName={'FileOutlined'} class="mr-1" />
                    &nbsp;
                    <span>{'文档'}</span>
                  </span>
                </Menu.Item>
                <MenuDivider />
                <Menu.Item key={'lock'}>
                  <span class="flex items-center">
                    <Icon iconName={'LockOutlined'} class="mr-1" />
                    &nbsp;
                    <span>{'修改密码'}</span>
                  </span>
                </Menu.Item>
                <Menu.Item key={'logout'}>
                  <span class="flex items-center">
                    <Icon iconName={'PoweroffOutlined'} class="mr-1" />
                    &nbsp;
                    <span>{'退出系统'}</span>
                  </span>
                </Menu.Item>
              </Menu>
            )
          }}
        >
          <div class="lx-head-hover_bg">
            <Avatar src={src} size="small"></Avatar>
            <span class="lx-head-username">admin</span>
          </div>
        </Dropdown>
      )
    }

    const ScreenFullRender = () => {
      const { toggle, isFullscreen } = useFullscreen()
      const getTitle = isFullscreen ? '全屏' : '退出全屏'
      return (
        <div class="lx-head-icon lx-head-hover_bg" onClick={toggle}>
          <Tooltip title={getTitle} placement="bottom" mouseEnterDelay={0.5}>
            <Icon
              iconName={!isFullscreen ? 'FullscreenExitOutlined' : 'FullscreenOutlined'}
              size={16}
            ></Icon>
          </Tooltip>
        </div>
      )
    }

    const Menufold = () => {
      const getTitle = store.collapse ? '展开' : '收起'
      function collapseClick() {
        store.collapseAction()
      }
      return (
        <div class="lx-head-icon lx-head-hover_bg" onClick={collapseClick}>
          <Tooltip title={getTitle} placement="bottom" mouseEnterDelay={0.5}>
            <Icon
              iconName={store.collapse ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'}
              size={16}
            ></Icon>
          </Tooltip>
        </div>
      )
    }

    return () => (
      <>
        <div class="lx-head-left">
          {Menufold()}
          <Breadcrumb class="lx-layout-header_bread">{renderBreadcrumb()}</Breadcrumb>
        </div>
        <div class="lx-head-right">
          {ScreenFullRender()}
          {UserRenderer({
            src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
          })}
        </div>
      </>
    )
  }
})
