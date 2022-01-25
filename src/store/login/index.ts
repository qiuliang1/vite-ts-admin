import { defineStore, acceptHMRUpdate } from 'pinia'
import { router } from '@/router'

interface IUser {
  username: string
  password: string
}

export const loginStore = defineStore({
  id: 'user',
  state: () => ({
    user: {
      username: '',
      password: ''
    },
    userInfo: {}
  }),
  actions: {
    logout() {
      this.$patch({
        user: { username: '' }
      })
      localStorage.removeItem('user')
      router.push('/')
    },
    login(user: IUser) {
      const { username, password } = user
      if (username === 'admin' && password === '123456') {
        this.$patch((state) => {
          state.userInfo = {
            role: ['admin'],
            address: '江苏省XX市'
          }
        })
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(loginStore, import.meta.hot))
}
