import { RouteLocationNormalized, RouteLocationRaw, Router } from 'vue-router'
import { toRaw, unref } from 'vue'
import { defineStore } from 'pinia'
import { getRawRoute } from '@/utils'
import { useRedo } from '@/hooks/usePage'
import { PageEnum } from '@/utils/enums'
import { PAGE_NOT_FOUND_NAME, REDIRECT_NAME } from '@/router/constant'

export interface MultipleTabState {
  cacheTabList: Set<string>
  tabList: RouteLocationNormalized[]
  lastDragEndIndex: number
}
const getToTarget = (tabItem: RouteLocationNormalized) => {
  const { params, path, query } = tabItem
  return {
    params: params || {},
    path,
    query: query || {}
  }
}
export const useMultipleTabStore = defineStore({
  id: 'app-multiple-tab',
  state: (): MultipleTabState => ({
    // Tabs that need to be cached
    cacheTabList: new Set(),
    // multiple tab list
    tabList: [], // cacheTab ? Persistent.getLocal(MULTIPLE_TABS_KEY) || [] : [],
    // Index of the last moved tab
    lastDragEndIndex: 0
  }),
  getters: {
    getTabList(): RouteLocationNormalized[] {
      return this.tabList
    },
    getCachedTabList(): string[] {
      return Array.from(this.cacheTabList)
    },
    getLastDragEndIndex(): number {
      return this.lastDragEndIndex
    }
  },
  actions: {
    async refreshPage(router: Router) {
      const { currentRoute } = router
      const route = unref(currentRoute)
      const name = route.name

      const findTab = this.getCachedTabList.find((item) => item === name)
      if (findTab) {
        this.cacheTabList.delete(findTab)
      }
      const redo = useRedo(router)
      await redo()
    },

    clearCacheTabs(): void {
      this.cacheTabList = new Set()
    },

    resetState(): void {
      this.tabList = []
      this.clearCacheTabs()
    },

    addTab(route: RouteLocationNormalized): void {
      const { path, name, fullPath, params, query, meta } = getRawRoute(route)
      if (
        path === PageEnum.ERROR_PAGE ||
        path === PageEnum.BASE_LOGIN ||
        !name ||
        [REDIRECT_NAME, PAGE_NOT_FOUND_NAME].includes(name as string)
      )
        return

      let updateIndex = -1
      const tabHasExits = this.tabList.some((tab, index) => {
        updateIndex = index
        return (tab.fullPath || tab.path) === (fullPath || path)
      })
      if (tabHasExits) {
        const curTab = toRaw(this.tabList)[updateIndex]
        if (!curTab) {
          return
        }
        curTab.params = params || curTab.params
        curTab.query = query || curTab.query
        curTab.fullPath = fullPath || curTab.fullPath
        this.tabList.splice(updateIndex, 1, curTab)
      } else {
        const dynamicLevel = meta?.dynamicLevel ?? -1
        if (dynamicLevel > 0) {
          // 如果动态路由层级大于 0 了，那么就要限制该路由的打开数限制了
          // 首先获取到真实的路由，使用配置方式减少计算开销.
          // const realName: string = path.match(/(\S*)\//)![1];
          const realPath = meta?.realPath ?? ''
          // 获取到已经打开的动态路由数, 判断是否大于某一个值
          if (
            this.tabList.filter((e) => e.meta?.realPath ?? '' === realPath).length >= dynamicLevel
          ) {
            // 关闭第一个
            const index = this.tabList.findIndex((item) => item.meta.realPath === realPath)
            index !== -1 && this.tabList.splice(index, 1)
          }
        }
        this.tabList.push(route)
        this.cacheTabList.add(name as string)
      }
    },
    async closeTab(tab: RouteLocationNormalized, router: Router) {
      const close = (route: RouteLocationNormalized) => {
        const { fullPath, meta: { affix } = {} } = route
        if (affix) {
          return
        }
        const index = this.tabList.findIndex((item) => item.fullPath === fullPath)
        index !== -1 && this.tabList.splice(index, 1)
      }

      const { currentRoute, replace } = router

      const { path } = unref(currentRoute)
      if (path !== tab.path) {
        // Closed is not the activation tab
        close(tab)
        return
      }

      let toTarget: RouteLocationRaw = {}

      const index = this.tabList.findIndex((item) => item.path === path)

      if (index === 0) {
        // There is only one tab, then jump to the homepage, otherwise jump to the right tab
        if (this.tabList.length === 1) {
          // const userStore = useUserStore()
          toTarget = PageEnum.BASE_HOME // userStore.getUserInfo.homePath || PageEnum.BASE_HOME
        } else {
          //  Jump to the right tab
          const page = this.tabList[index + 1]
          toTarget = getToTarget(page)
        }
      } else {
        // Close the current tab
        const page = this.tabList[index - 1]
        toTarget = getToTarget(page)
      }
      close(currentRoute.value)
      await replace(toTarget)
    }
  }
})
