import { defineComponent, h, PropType } from 'vue'
import * as IconComponent from '@element-plus/icons'
import { ElIcon } from 'element-plus'

export function isValidKey (
  key: string | number | symbol
): key is keyof typeof IconComponent {
  return key in IconComponent
}

export default defineComponent({
  name: 'ElIcons',
  //   component: IconComponent,
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
  setup (props) {
    const { size = 14, color = '#999' } = props
    const iconName = props.iconName as string
    return () => (
      <ElIcon size={size} color={color}>
        {
            isValidKey(iconName) && h(IconComponent[iconName])
        }
      </ElIcon>
    )
  }
})
