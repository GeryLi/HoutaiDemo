<template>
  <div class="box">
    <div class="top">
      <p class="title">年龄</p>
      <p class="bg"></p>
    </div>

    <div class="chars" ref="refChars"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
const refChars = ref()
onMounted(() => {
  let mycharts = echarts.init(refChars.value)
  mycharts.setOption({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      right: 30,
      top: '25%',
      left: 'right',
      orient: 'vertical',
      textStyle: {
        color: 'white',
        fontSize: 16,
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white',
        },

        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '军事' },
          { value: 735, name: '新闻' },
          { value: 580, name: '直播' },
          { value: 484, name: '娱乐' },
          { value: 300, name: '财经' },
        ],
      },
    ],
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
    margin-top: 40px;
    margin-left: 20px;
    margin: 0 auto;
    width: 80%;
    height: 260px;
  }
}
</style>
