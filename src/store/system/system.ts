import { defineStore } from 'pinia'

export const layoutStore = defineStore('systemStore', {
  state: () => {
    return {
      autoInsertSpace: true,
      locale: {}
    }
  },
  actions: {}
})
