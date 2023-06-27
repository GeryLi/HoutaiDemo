<template>
  <RouterView />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useSettingStore } from './store/module/useSeetingStore'

onMounted(() => {
  if (useSettingStore().isDark) {
    document.documentElement.className = 'dark'
  }
})
</script>

<style scoped lang="scss"></style>
