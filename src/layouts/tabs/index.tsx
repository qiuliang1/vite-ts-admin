import { defineComponent, computed } from 'vue'
import type { RouteMeta, RouteLocationNormalized, RouteRecordName } from 'vue-router'
import Icon from '@/components/Icon'
import { Dropdown } from '@/components/Dropdown'
import { useMultipleTabStore } from '@/store/system/multipleTab'
import { useRouter, useRoute } from 'vue-router'
import { useTabDropdown } from './useTabDropdown'
import { MenuEventEnum } from '@/utils/enums'
import { initAffixTabs } from './tabUtil'

type routeName = RouteRecordName | undefined | null
interface ITab {
  meta: RouteMeta
  name: routeName
  active?: boolean
  info: RouteLocationNormalized
}
export default defineComponent({
  props: {
    tabItem: {
      type: Object as PropType<RouteLocationNormalized>,
      default: null
    },
    isExtra: Boolean
  },
  emits: [],
  //   components: {},
  setup(props) {
    const store = useMultipleTabStore()
    const router = useRouter()
    const route = useRoute()

    const getIsTabs = computed(() => !props.isExtra)
    const { getDropMenuList, handleMenuEvent, handleContextMenu } = useTabDropdown(props, getIsTabs)

    const Tab = ({ name, meta, active, info }: ITab) => {
      const remove = (e: MouseEvent) => {
        e.preventDefault()
        if (meta.affix) {
          tabClick()
          return
        }
        if (active) {
          const tabs = store.getTabList
          const last = tabs[tabs.length - 2].name
          routeTo(last)
        }
        store.closeTab(info, router)
      }
      const tabClick = (e?: MouseEvent) => {
        e && e.preventDefault()
        routeTo(name)
      }
      function routeTo(routeName: routeName) {
        router.push({
          name: routeName!
        })
      }
      return (
        <div class={['lx-tabs-tab', active ? 'lx-tabs_active' : 'lx-tabs_deactive']}>
          <span onClick={tabClick} class="lx-tabs-tab_text">
            {meta.title}
          </span>

          <span onClick={remove} class="lx-tabs_padding">
            {!meta.affix && (
              <Icon
                iconName="CloseOutlined"
                class={['lx-icon', !active ? 'lx-icon_hover' : 'lx-icon_hov']}
              />
            )}
          </span>
        </div>
      )
    }

    const Tools = () => {
      function handleContext(e: Event) {
        props.tabItem && handleContextMenu(props.tabItem)(e)
      }
      const MultipleTab = () => {
        return (
          <Dropdown
            dropMenuList={getDropMenuList.value}
            trigger={['click']}
            onMenuEvent={handleMenuEvent}
            v-slots={{
              default: () => (
                <div class="lx-tabs-content__extra-redo" onClick={handleContext}>
                  <Icon iconName="DownOutlined" size={16} />
                </div>
              )
            }}
          ></Dropdown>
        )
      }

      return (
        <div class="ant-tabs-extra-content">
          <div
            class="lx-tabs-content__extra-redo"
            onClick={() => handleMenuEvent({ event: MenuEventEnum.REFRESH_PAGE, text: '' })}
          >
            <Icon iconName="RedoOutlined" size={16} />
          </div>
          <MultipleTab />
        </div>
      )
    }

    return () => (
      <div class="lx-tabs flex flex-bt">
        <div>
          {[...store.getTabList].map((v) => {
            return <Tab info={v} name={v.name} meta={v.meta} active={route.name === v.name} />
          })}
        </div>
        <Tools />
      </div>
    )
  },
  mounted() {
    initAffixTabs()
  }
})
