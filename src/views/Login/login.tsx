import { defineComponent, ref, reactive, onMounted, h, resolveComponent } from 'vue'
import { useRouter } from 'vue-router'
import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus'
import Icon from '@/components/Icon'

interface IUser {
  username: string
  password: string
}

export default defineComponent({
  components: {
    Icon
  },
  setup () {
    const data = reactive<{ user: IUser }>({
      user: {
        username: '',
        password: ''
      }
    })
    const router = useRouter()
    const loginForm = ref<typeof ElForm | null>(null)

    function login () {
      if(!loginForm.value) return
      loginForm.value.validate((valid: boolean) => {
        if (valid) {
          if (data.user.username === 'admin' && data.user.password === '123456') {
            router.push({
              name: ''
            })
          }
        }
      })
    }

    function keyup ({ code }: KeyboardEvent) {
      if (code === 'Enter') {
      }
    }

    return () => (
      <div class="login-wrap">
        <ElForm model={data.user} label-width="120px" ref={loginForm}>
          <ElFormItem label="用户名" prop="username">
            <ElInput placeholder="请输入用户名" v-model={data.user.username} prefix-icon={<Icon iconName="User" />} />
          </ElFormItem>
          <ElFormItem label="密 码" prop="password">
            <ElInput
              placeholder="请输入密码"
              v-model={data.user.password}
              prefix-icon={<Icon iconName="Lock" />}
              {...{ onKeyup: keyup }}
            />
          </ElFormItem>
          <ElFormItem>
            <ElButton type="primary" onClick={login}>提 交</ElButton>
          </ElFormItem>
        </ElForm>
      </div>
    )
  }
})
