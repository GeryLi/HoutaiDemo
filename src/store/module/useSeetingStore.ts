import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingStore = defineStore('setting', () => {
  const isOpen = ref(true)
  const refrsh = ref(false)

  const changeIsopen = () => {
    isOpen.value = !isOpen.value
  }

  const changeRefrsh = () => {
    refrsh.value = !refrsh.value
  }

  return { isOpen, changeIsopen, refrsh, changeRefrsh }
})
