import { DropMenu } from '@/components/Dropdown'
import type { ComputedRef } from 'vue'
import { unref, computed, reactive } from 'vue'
import { RouteLocationNormalized, useRouter } from 'vue-router'
import { useMultipleTabStore } from '@/store/system/multipleTab'
import { MenuEventEnum, TabContentEnum } from '@/utils/enums'

interface TabContentProps {
  tabItem: RouteLocationNormalized
  type?: TabContentEnum
  trigger?: ('click' | 'hover' | 'contextmenu')[]
}
export function useTabDropdown(tabContentProps: TabContentProps, getIsTabs: ComputedRef<boolean>) {
  const router = useRouter()
  const { currentRoute } = router
  const getTargetTab = computed((): RouteLocationNormalized => {
    return unref(getIsTabs) ? tabContentProps.tabItem : unref(currentRoute)
  })
  const state = reactive({
    current: null as Nullable<RouteLocationNormalized>,
    currentIndex: 0
  })
  const tabStore = useMultipleTabStore()
  const getDropMenuList = computed(() => {
    if (!unref(getTargetTab)) {
      return
    }

    const { meta } = unref(getTargetTab)
    const { path } = unref(currentRoute)

    const curItem = state.current

    const isCurItem = curItem ? curItem.path === path : false

    // Refresh button
    const index = state.currentIndex
    const refreshDisabled = !isCurItem
    // Close left
    const closeLeftDisabled = index === 0 || !isCurItem

    const disabled = tabStore.getTabList.length === 1

    // Close right
    const closeRightDisabled =
      !isCurItem || (index === tabStore.getTabList.length - 1 && tabStore.getLastDragEndIndex >= 0)
    const dropMenuList: DropMenu[] = [
      {
        icon: 'RedoOutlined',
        event: MenuEventEnum.REFRESH_PAGE,
        text: '重新加载',
        disabled: refreshDisabled
      },
      {
        icon: 'CloseOutlined',
        event: MenuEventEnum.CLOSE_CURRENT,
        text: '关闭标签页',
        disabled: !!meta?.affix || disabled,
        divider: true
      },
      {
        icon: 'VerticalRightOutlined',
        event: MenuEventEnum.CLOSE_LEFT,
        text: '关闭左侧标签页',
        disabled: closeLeftDisabled,
        divider: false
      },
      {
        icon: 'VerticalLeftOutlined',
        event: MenuEventEnum.CLOSE_RIGHT,
        text: '关闭右侧标签页',
        disabled: closeRightDisabled,
        divider: true
      },
      {
        icon: 'VerticalAlignMiddleOutlined',
        event: MenuEventEnum.CLOSE_OTHER,
        text: '关闭其它标签页',
        disabled: disabled || !isCurItem
      },
      {
        icon: 'MinusOutlined',
        event: MenuEventEnum.CLOSE_ALL,
        text: '关闭所有',
        disabled: disabled
      }
    ]

    return dropMenuList
  })

  function handleContextMenu(tabItem: RouteLocationNormalized) {
    return (e: Event) => {
      if (!tabItem) {
        return
      }
      e?.preventDefault()
      const index = tabStore.getTabList.findIndex((tab) => tab.path === tabItem.path)
      state.current = tabItem
      state.currentIndex = index
    }
  }

  function handleMenuEvent(menu: DropMenu): void {
    const { event } = menu
    switch (event) {
      case MenuEventEnum.REFRESH_PAGE:
        // refresh page
        tabStore.refreshPage(router)
        break
      // Close current
      case MenuEventEnum.CLOSE_CURRENT:
        tabStore.closeTab(tabContentProps.tabItem, router)
        break
      // Close left
      case MenuEventEnum.CLOSE_LEFT:
        // closeLeft()
        break
      // Close right
      case MenuEventEnum.CLOSE_RIGHT:
        // closeRight()
        break
      // Close other
      case MenuEventEnum.CLOSE_OTHER:
        // closeOther()
        break
      // Close all
      case MenuEventEnum.CLOSE_ALL:
        // closeAll()
        break
    }
  }

  return {
    getDropMenuList,
    handleContextMenu,
    handleMenuEvent
  }
}
