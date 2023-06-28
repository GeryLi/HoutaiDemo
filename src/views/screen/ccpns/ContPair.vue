<template>
  <div class="box">
    <div class="top">
      <p class="title">数据统计</p>
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
  let option = {
    title: {
      text: '游客消费统计',
      textStyle: {
        color: 'white',
      },
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '消费', max: 6500 },
        { name: '好感', max: 16000 },
        { name: '出行', max: 30000 },
        { name: '小吃', max: 38000 },
        { name: '爱好', max: 52000 },
        { name: '景点', max: 25000 },
      ],
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '购物',
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: '吃饭',
          },
        ],
      },
    ],
  }
  //设置配置项
  myechars.setOption(option)
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
