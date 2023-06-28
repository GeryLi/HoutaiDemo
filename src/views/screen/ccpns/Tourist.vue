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
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="refcharts"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
let refcharts = ref()
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import { onMounted } from 'vue'

let people = ref('2157888人')
onMounted(() => {
  let mycharts = echarts.init(refcharts.value)
  mycharts.setOption({
    title: {
      text: '水球图',
    },
    series: [
      {
        type: 'liquidFill',
        data: [0.6, 0.5, 0.4, 0.3],
        radius: '100%',
      },
    ],
    grid: {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    },
  })
})
</script>

<style scoped lang="scss">
.box {
  background: url(../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    overflow: hidden;

    margin-left: 20px;

    .title {
      color: white;
      font-size: 20px;
    }
    .bg {
      float: left;
      margin-top: 10px;
      width: 68px;
      height: 7px;
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

  .number {
    overflow: hidden;
    display: flex;
    margin-top: 30px;
    margin-bottom: 10px;

    span {
      flex: 1;
      height: 40px;
      background: url(../images/total.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      margin: 0 5px;
    }
  }
  .charts {
    width: 100%;
    height: 250px;
  }
}
</style>
