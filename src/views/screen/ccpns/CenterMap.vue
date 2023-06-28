<template>
  <div class="box" ref="boxRef"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { getJson } from '@/utils/getJson'

echarts.registerMap('china', getJson() as any)
const boxRef = ref()

onMounted(() => {
  let mycharts = echarts.init(boxRef.value)
  mycharts.setOption({
    geo: {
      map: 'china',
      roam: true,
      label: {
        show: true,
        color: '#29fafe',
        fontSize: 12,
      },
      itemStyle: {
        color: '#111f2c',
      },
      emphasis: {
        itemStyle: {
          color: '#fff',
        },
        label: {
          fontSize: 20,
          color: '#111f2c',
        },
      },
    },
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [102.712251, 25.040609], //终点
            ],
            lineStyle: {
              width: 5,
            },
          },
        ],
        effect: {
          show: true,
          symbol: 'circle',
          color: 'pink',
          symbolSize: 10,
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss"></style>
