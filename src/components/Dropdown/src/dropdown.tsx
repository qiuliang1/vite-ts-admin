import { PropType, defineComponent } from 'vue'
import type { DropMenu, PopConfirm } from './typing'
import { Dropdown, Menu, Popconfirm } from 'ant-design-vue'
import Icon from '@/components/Icon'
import { omit } from 'lodash'
import { isFunction } from '@/utils/is'

export default defineComponent({
  name: 'ADropdown',
  props: {
    popconfirm: Boolean,
    /**
     * the trigger mode which executes the drop-down action
     * @default ['hover']
     * @type string[]
     */
    trigger: {
      type: [Array] as PropType<('contextmenu' | 'click' | 'hover')[]>,
      default: () => {
        return ['hover']
      }
    },
    dropMenuList: {
      type: Array as PropType<DropMenu[]>,
      default: () => []
    },
    selectedKeys: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  emits: ['menuEvent'],
  setup(props, { slots, emit }) {
    function handleClickMenu(item: DropMenu) {
      console.log('handleClickMenu', item)

      const { event } = item
      const menu = props.dropMenuList.find((item) => `${item.event}` === `${event}`)
      emit('menuEvent', menu)
      item.onClick?.()
    }
    // const getPopConfirmAttrs = computed(() => {
    //   return (attrs: PopConfirm) => {
    //     const originAttrs = omit(attrs, ['confirm', 'cancel', 'icon'])
    //     if (!attrs.onConfirm && attrs.confirm && isFunction(attrs.confirm))
    //       originAttrs['onConfirm'] = attrs.confirm
    //     if (!attrs.onCancel && attrs.cancel && isFunction(attrs.cancel))
    //       originAttrs['onCancel'] = attrs.cancel
    //     return originAttrs
    //   }
    // })
    const getPopConfirmAttr = (attrs: PopConfirm) => {
      const originAttrs = omit(attrs, ['confirm', 'cancel', 'icon'])
      if (!attrs.onConfirm && attrs.confirm && isFunction(attrs.confirm))
        originAttrs['onConfirm'] = attrs.confirm
      if (!attrs.onCancel && attrs.cancel && isFunction(attrs.cancel))
        originAttrs['onCancel'] = attrs.cancel
      return originAttrs
    }
    const getAttr = (key: string | number) => ({ key })

    return () => (
      <Dropdown
        trigger={props.trigger}
        v-slots={{
          overlay: () => (
            <Menu>
              {props.dropMenuList.map((item) => {
                return (
                  <>
                    {item.divider && <Menu.Divider />}
                    <Menu.Item
                      onClick={() => handleClickMenu(item)}
                      disabled={item.disabled}
                      {...getAttr(item.event)}
                    >
                      {props.popconfirm && item.popConfirm ? (
                        <Popconfirm
                          v-bind={getPopConfirmAttr(item.popConfirm)}
                          v-slots={{
                            icon: () => <Icon iconName="item.popConfirm.icon" />
                          }}
                        >
                          <div>
                            {item.icon && <Icon iconName={item.icon} />}
                            <span class="ml-1">{item.text}</span>
                          </div>
                        </Popconfirm>
                      ) : (
                        <>
                          {item.icon && <Icon iconName={item.icon} />}
                          <span class="ml-1">{item.text}</span>
                        </>
                      )}
                    </Menu.Item>
                  </>
                )
              })}
            </Menu>
          )
        }}
      >
        <span>{slots.default && slots.default()}</span>
      </Dropdown>
    )
  }
})
