<template>
  <div class="box">
    <div class="top">
      <p class="title">男女比例</p>
      <p class="bg"></p>
    </div>
    <div class="sex">
      <div class="man">
        <img src="../images/man.png" alt="" />
      </div>
      <div class="women"><img src="../images/woman.png" alt="" /></div>
    </div>
    <div class="bar">
      <p class="man">男性58%</p>
      <p class="women">女性42%</p>
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
    //标题组件
    title: {
      text: '访问量',
    },
    //x|y轴
    xAxis: {
      type: 'category',
      //两侧不留白
      boundaryGap: false,
      //分割线不要
      splitLine: {
        show: false,
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      //轴线的设置
      axisLine: {
        show: true,
      },
      //刻度
      axisTick: {
        show: true,
      },
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      //轴线的设置
      axisLine: {
        show: true,
      },
      //刻度
      axisTick: {
        show: true,
      },
    },
    grid: {
      left: 40,
      top: 0,
      right: 20,
      bottom: 20,
    },
    //系列
    series: [
      {
        type: 'line',
        data: [120, 1240, 66, 2299, 321, 890, 1200],
        //平滑曲线的设置
        smooth: true,
        //区域填充样式
        areaStyle: {
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
  .sex {
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 50px;
    width: 80%;

    .man {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 111px;
      height: 115px;
      background: url(../images/man-bg.png) no-repeat;
      background-size: 100% 100%;
    }
    .women {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 111px;
      height: 115px;
      background: url(../images/woman-bg.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .bar {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    color: #29fcff;
    font-size: 16px;
  }
  .chars {
    margin: 0 auto;
    height: 45px;
    width: 80%;
  }
}
</style>
