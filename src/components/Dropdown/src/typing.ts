export interface DropMenu {
  popConfirm?: PopConfirm
  onClick?: Fn
  to?: string
  icon?: string
  event: string | number
  text: string
  disabled?: boolean
  divider?: boolean
}

export interface PopConfirm {
  title: string
  okText?: string
  cancelText?: string
  confirm: Fn
  cancel?: Fn
  onConfirm?: Fn
  onCancel?: Fn
  icon?: string
  placement?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom'
    | 'bottomLeft'
    | 'bottomRight'
}
