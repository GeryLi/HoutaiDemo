<template>
  <div class="logo_box">
    <el-avatar
      style="flex-shrink: 0"
      :size="40"
      src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
    />
    <Transition name="h1">
      <h2 v-if="settingStore.isOpen">后台管理系统</h2>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/store/module/useSeetingStore'
const settingStore = useSettingStore()
</script>

<style scoped lang="scss">
.logo_box {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.h1-enter-from {
  opacity: 0;
}

.h1-enter-active {
  transition: all 2.5s;
}

.h1-enter-to {
  opacity: 1;
}
</style>
