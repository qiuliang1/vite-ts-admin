import { defineStore } from 'pinia'

export const layoutStore = defineStore('layoutStore', {
  state: () => {
    return {
      collapse: false
    }
  },
  actions: {
    collapseAction() {
      this.collapse = !this.collapse
    }
  }
})
