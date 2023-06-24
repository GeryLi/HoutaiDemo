<template>
  <router-view v-slot="{ Component }">
    <transition name="MainFade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/store/module/useSeetingStore'
import { nextTick, watch } from 'vue'
import { ref } from 'vue'
const flag = ref(true)

const settingStore = useSettingStore()
watch(
  () => settingStore.refrsh,
  () => {
    flag.value = !flag.value
    nextTick(() => {
      flag.value = !flag.value
    })
  },
)
</script>

<style scoped lang="scss">
// 定义过渡动画
.MainFade-enter-from {
  opacity: 0;
}

.MainFade-enter-active {
  transition: all 1s;
}

.MainFade-enter-to {
  opacity: 1;
}
</style>
