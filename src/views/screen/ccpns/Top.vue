<template>
  <div class="top">
    <div class="t_left">
      <span class="lbtn" @click="$router.push('/')">首页</span>
    </div>
    <div class="t_center">
      <div class="title">智慧旅游可视化大平台</div>
    </div>
    <div class="t_right">
      <span class="title">统计报告</span>
      <span class="time">当前时间 : {{ time }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { onUnmounted } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'

let time = ref()
let times = ref()
const getTime = () => {
  return dayjs().format('YYYY年MM月DD日 HH:mm:ss')
}
onMounted(() => {
  times.value = setInterval(() => {
    time.value = getTime()
  }, 1000)
})
onUnmounted(() => {
  clearInterval(times.value)
})
</script>

<style scoped lang="scss">
.top {
  display: flex;
  width: 100%;
  height: 40px;
  color: #29fcff;

  .t_left {
    flex: 1.5;
    background: url(../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    .lbtn {
      font-style: 40px;
      float: right;
      text-align: center;
      line-height: 40px;
      width: 150px;
      background: url(../images/dataScreen-header-btn-bg-l.png);
      background-size: 100% 100%;
    }
  }
  .t_center {
    height: 70px;
    flex: 2;
    background: url(../images/dataScreen-header-center-bg.png) no-repeat;
    background-size: 100% 100%;
    .title {
      font-size: 30px;
      text-align: center;
      line-height: 74px;
    }
  }
  .t_right {
    display: flex;
    flex: 1.5;
    background: url(../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: 100% 100%;
    font-style: 40px;
    float: left;
    text-align: center;
    line-height: 40px;
    align-items: center;
    justify-content: space-between;
    .title {
      width: 150px;
      background: url(../images/dataScreen-header-btn-bg-r.png) no-repeat;
      block-size: 100%;
    }
    .time {
      margin-right: 30px;
    }
  }
}
</style>
