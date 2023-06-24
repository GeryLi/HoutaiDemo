<template>
  <svg :style="{ width: size, height: size }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  // 图标使用前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  // 图标名字
  name: {
    type: String,
    default: 'phone',
  },
  // 图标颜色
  color: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '16px',
  },
})
</script>

<style scoped></style>
