import { defineComponent, ref, reactive, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '@/components/Icon'
interface IUser {
  username: string
  password: string
}

export default defineComponent({
  components: {
    Icon
  },
  setup() {
    const modelRef = reactive<IUser>({
      username: 'admin',
      password: '123456'
    })
    const router = useRouter()
    const formRef = ref()
    const rulesRef = reactive({
      username: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      ]
    })
    function login(event?: MouseEvent) {
      event && event.preventDefault()
      formRef.value
        .validate()
        .then(() => {
          console.log(toRaw(modelRef))

          if (modelRef.username === 'admin' && modelRef.password === '123456') {
            router.push({
              name: 'Analysis'
            })
          }
        })
        .catch((err: any) => {
          console.log('error', err)
        })
    }
    const resetForm = () => {
      formRef.value.resetFields()
    }
    function keyup({ code }: KeyboardEvent) {
      if (code === 'Enter') {
        login()
      }
    }
    const formConfig = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 14
      }
    }
    return () => (
      <div class="login-wrap">
        <a-form model={modelRef} ref={formRef} rules={rulesRef} {...formConfig}>
          <a-form-item label="用户名" name="username">
            <a-input
              v-model:value={modelRef.username}
              v-slots={{
                prefix: () => <Icon iconName="icon-200yonghu_yonghu" />
              }}
            />
          </a-form-item>
          <a-form-item label="密 码" name="password">
            <a-input
              v-model:value={modelRef.password}
              type="password"
              autocomplete="off"
              v-slots={{
                prefix: () => <Icon iconName="icon-mima" />
              }}
            />
          </a-form-item>
          <a-form-item wrapper-col={{ span: 14, offset: 4 }}>
            <a-button type="primary" onClick={login} onKeyup={keyup}>
              登陆
            </a-button>
            <a-button style="margin-left: 10px" onClick={resetForm}>
              Reset
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    )
  }
})
