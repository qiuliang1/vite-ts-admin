import { defineStore, acceptHMRUpdate } from 'pinia'

interface IUser {
  username: string
  password: string
}

export const logintStore = defineStore({
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
  import.meta.hot.accept(acceptHMRUpdate(logintStore, import.meta.hot))
}
