<template>
  <div class="box">
    <div class="top">
      <p class="title">年度游客量对比</p>
      <p class="bg"></p>
    </div>
    <div class="chars" ref="charsRef"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'

import { onMounted, ref } from 'vue'
const charsRef = ref()

onMounted(() => {
  let myechars = echarts.init(charsRef.value)
  myechars.setOption({
    title: {
      text: '散点图',
      left: '40%',
      textStyle: {
        color: 'white',
      },
    },
    xAxis: {
      type: 'category',
      show: true,
    },
    yAxis: {
      show: false,
    },
    grid: {
      left: 20,
      top: 20,
      right: 0,
      bottom: 20,
    },
    series: {
      type: 'scatter',
      data: [
        33, 88, 21, 9, 88, 234, 113, 1231, 674, 3, 88, 33, 21, 888, 3332, 313,
        123, 5, 657, 7,
      ],
      //标记图形设置
      symbol: 'diamond',
      symbolSize: 16,
      //图文标签
      label: {
        show: true,
        position: 'top',
        color: 'red',
      },
      //散点图标记的颜色
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'red', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'blue', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
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
  }
  .chars {
    width: 100%;
    height: calc(100% - 30px);
  }
}
</style>
