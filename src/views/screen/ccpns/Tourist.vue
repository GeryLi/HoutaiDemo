<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span>9999</span>
        人
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.box {
  background: url(../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    margin-left: 20px;

    .title {
      color: white;
      font-size: 20px;
    }
    .bg {
      margin-top: 10px;
      width: 68px;
      height: 7px;
      background-color: red;
      background: url(../images/dataScreen-title.png) no-repeat;
      block-size: 100% 100%;
    }
    .right {
      float: right;
      font-size: 20px;
      color: white;
      span {
        color: rgba(66, 111, 207, 0.856);
      }
    }
  }
}
</style>
