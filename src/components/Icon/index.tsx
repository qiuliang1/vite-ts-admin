import { defineComponent, h, watch } from 'vue'
import * as IconComponent from '@element-plus/icons'
import { ElIcon } from 'element-plus'

export function isValidKey(key: string | number | symbol): key is keyof typeof IconComponent {
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
  setup(props) {
    let iconName = ''
    watch(props, () => {
      iconName = props.iconName as string
    })

    return () => (
      <ElIcon size={props.size} color={props.color}>
        {isValidKey(iconName) && h(IconComponent[iconName])}
      </ElIcon>
    )
  }
})
