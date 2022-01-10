import { defineComponent, ref, reactive, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { Form, FormItem, Input, Button } from 'ant-design-vue'
import Icon from '@/components/Icon'
interface IUser {
  username: string
  password: string
}

export default defineComponent({
  components: {
    Icon,
    Form,
    FormItem,
    Input,
    Button
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
    // function keyup({ code }: KeyboardEvent) {
    //   if (code === 'Enter') {
    //     login()
    //   }
    // }
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
        <Form model={modelRef} ref={formRef} rules={rulesRef} {...formConfig}>
          <FormItem label="用户名" name="username">
            <Input
              v-model:value={modelRef.username}
              v-slots={{
                prefix: () => <Icon iconName="icon-200yonghu_yonghu" />
              }}
            />
          </FormItem>
          <FormItem label="密 码" name="password">
            <Input
              v-model:value={modelRef.password}
              type="password"
              v-slots={{
                prefix: () => <Icon iconName="icon-mima" />
              }}
            />
          </FormItem>
          <FormItem wrapper-col={{ span: 14, offset: 4 }}>
            <Button type="primary" onClick={login}>
              登陆
            </Button>
            <Button style="margin-left: 10px" onClick={resetForm}>
              Reset
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
})
