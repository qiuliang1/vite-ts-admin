import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useI18n } from 'vue-i18n'

import '@/styles/index.scss'

export default defineComponent({
  setup() {
    const { locale } = useI18n()
    return () => (
      <a-config-provider locale={locale.value === 'en-US' ? enUS : zhCN}>
        <RouterView />
      </a-config-provider>
    )
  }
})
