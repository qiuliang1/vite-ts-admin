import { toRaw, ref } from 'vue'
import { RouteLocationNormalized } from 'vue-router'
// import { useDesign } from '/@/hooks/web/useDesign'
// import { useSortable } from '/@/hooks/web/useSortable'
import { useMultipleTabStore } from '@/store/system/multipleTab'
// import { isNullAndUnDef } from '@/utils/is'
// import projectSetting from '@/settings/projectSetting'
import { uniqBy } from 'lodash'
import { useRouter } from 'vue-router'

export function initAffixTabs(): string[] {
  const affixList = ref<RouteLocationNormalized[]>([])

  const tabStore = useMultipleTabStore()
  const router = useRouter()

  const affixl = ref<RouteLocationNormalized[]>([])
  /**
   * @description: Filter all fixed routes
   */
  function filterAffixTabs(routes: RouteLocationNormalized[]) {
    const tabs: RouteLocationNormalized[] = []
    routes &&
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          tabs.push(toRaw(route))
        }
      })
    return tabs
  }

  /**
   * @description: Set fixed tabs
   */
  function addAffixTabs(): void {
    const affixTabs = filterAffixTabs(router.getRoutes() as unknown as RouteLocationNormalized[])
    affixList.value = affixTabs
    for (const tab of affixTabs) {
      affixl.value.push({
        meta: tab.meta,
        name: tab.name,
        path: tab.path
      } as unknown as RouteLocationNormalized)
      tabStore.cacheTabList.add(tab.name as string)
    }
  }

  let isAddAffix = false

  if (!isAddAffix) {
    addAffixTabs()
    isAddAffix = true
  }
  tabStore.tabList = uniqBy([...affixl.value, ...tabStore.tabList], 'name')
  return affixList.value.map((item) => item.meta?.title).filter(Boolean) as string[]
}

// export function useTabsDrag(affixTextList: string[]) {
//   const tabStore = useMultipleTabStore()
//   const { multiTabsSetting } = projectSetting
//   const { prefixCls } = useDesign('multiple-tabs')
//   nextTick(() => {
//     if (!multiTabsSetting.canDrag) return
//     const el = document.querySelectorAll(
//       `.${prefixCls} .ant-tabs-nav-wrap > div`
//     )?.[0] as HTMLElement
//     const { initSortable } = useSortable(el, {
//       filter: (e: ChangeEvent) => {
//         const text = e?.target?.innerText
//         if (!text) return false
//         return affixTextList.includes(text)
//       },
//       onEnd: (evt) => {
//         const { oldIndex, newIndex } = evt

//         if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
//           return
//         }

//         tabStore.sortTabs(oldIndex, newIndex)
//       }
//     })
//     initSortable()
//   })
// }
