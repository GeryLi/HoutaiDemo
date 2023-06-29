<template>
  <div class="box">
    <div class="content">
      <img src="/images/404.png" alt="" />
      <div class="right">
        <h2>404</h2>
        <el-button type="primary" size="default" @click="$router.push('/')">
          返回首页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    display: flex;
    align-items: center;
    .right {
      margin-left: 30px;
      h2 {
        font-size: 60px;
        margin: 10px;
      }
      p {
      }
    }
  }
}
</style>
