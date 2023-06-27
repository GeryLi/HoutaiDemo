<template>
  <ElCard>
    <div class="box">
      <img :src="userStore.avatar" class="avatar" />

      <h3>{{ getTime() }}好！尊敬的{{ userStore.username }}~</h3>
    </div>
  </ElCard>
  <div class="banner">
    <img src="/images/welcome.png" alt="" />
  </div>
</template>

<script lang="ts" setup>
import useUserStore from '@/store/module/userStore'
import { getTime } from '@/utils/time'

const userStore = useUserStore()
</script>

<style scoped lang="scss">
.box {
  display: flex;
  align-items: center;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
  }
  h3 {
    font-size: 20px;
    font-weight: 600;
    color: rgb(90, 86, 86);
  }
}
.banner {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  img {
    width: 60%;
  }
}
</style>
