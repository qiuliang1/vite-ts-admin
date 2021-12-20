import { defineStore, acceptHMRUpdate } from 'pinia'

export const usertStore = defineStore({
  id: 'user',
  state: () => ({
    userInfo: {
      name: '',
      address: ''
    }
  })
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usertStore, import.meta.hot))
}
