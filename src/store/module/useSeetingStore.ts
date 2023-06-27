import { defineStore } from 'pinia'
import { ref } from 'vue'

const parseDark = () => {
  if (localStorage.getItem('dark') == 'true') {
    return true
  } else {
    return false
  }
}

export const useSettingStore = defineStore('setting', () => {
  const isOpen = ref(true)
  const refrsh = ref(false)
  const isDark = ref(parseDark())

  const changeIsopen = () => {
    isOpen.value = !isOpen.value
  }

  const changeRefrsh = () => {
    refrsh.value = !refrsh.value
  }
  const changeDark = () => {
    localStorage.setItem('dark', JSON.stringify(isDark.value))
  }

  return { isOpen, changeIsopen, refrsh, changeRefrsh, isDark, changeDark }
})
