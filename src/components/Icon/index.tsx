import { defineComponent, watch, createVNode } from 'vue'
import { createFromIconfontCN } from '@ant-design/icons-vue'
import * as $icon from '@ant-design/icons-vue'

export function isValidKey(key: string | number | symbol): key is keyof typeof $icon {
  return key in $icon
}
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2039396_4twcccot5mf.js'
})

export default defineComponent({
  name: 'ElIcons',
  component: {
    IconFont
  },
  props: {
    size: {
      type: Number
    },
    color: {
      type: String
    },
    iconName: {
      type: String
    }
  },
  setup(props) {
    let iconName = ''
    iconName = props.iconName as string
    watch(props, (newProp) => {
      iconName = newProp.iconName as string
    })
    if (iconName.includes('icon')) {
      return () => (
        <IconFont type={iconName} style={{ fontSize: props.size + 'px', color: props.color }} />
      )
    }
    return () =>
      isValidKey(iconName) &&
      createVNode($icon[iconName], { style: { fontSize: props.size + 'px', color: props.color } })
  }
})
