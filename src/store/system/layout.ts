import { defineStore } from 'pinia'
import { AppRouteRecordRaw } from '@/router/types'
import { uniqBy } from 'lodash'

export const layoutStore = defineStore('layoutStore', {
  state: () => {
    return {
      collapse: false,
      tabs: <AppRouteRecordRaw[]>[],
      tabMap: new Map()
    }
  },
  actions: {
    collapseAction() {
      this.collapse = !this.collapse
    },
    addTab(item: AppRouteRecordRaw) {
      console.log(333)

      if (!this.tabMap.has(item.name)) {
        this.tabs.push(item)
        this.tabMap.set(item.name, item)
      }
    },
    removeTab(item: AppRouteRecordRaw) {
      const index = this.tabs.findIndex((tab) => tab.name === item.name)
      this.tabs.splice(index, 1)
      this.tabMap.delete(item.name)
      console.log(222)
    },
    getFixTab(asyncRoute: AppRouteRecordRaw[]) {
      const tabs: AppRouteRecordRaw[] = []
      const handle = (route: AppRouteRecordRaw[]) => {
        route.forEach((v) => {
          if (v.meta.affix) {
            tabs.push(v)
            this.tabMap.set(v.name, v)
          } else {
            v.children && handle(v.children)
          }
        })
      }
      handle(asyncRoute)

      this.tabs = uniqBy([...tabs, ...this.tabs] as AppRouteRecordRaw[], 'name')
    }
  }
})
