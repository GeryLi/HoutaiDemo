<template>
  <div class="container">
    <div class="screen" ref="refScreen">
      <Top />
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist" />
          <Sex class="sex" />
          <Age class="age" />
        </div>
        <div class="center">
          <CenterMap class="map" />
          <CenterLine class="line" />
        </div>
        <div class="right">
          <Rank class="rank" />
          <YearRank class="yearrank" />
          <ContPair class="contpair" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { ref } from 'vue'
import Top from './ccpns/Top.vue'
import Sex from './ccpns/Sex.vue'
import Tourist from './ccpns/Tourist.vue'
import Age from './ccpns/Age.vue'
import CenterMap from './ccpns/CenterMap.vue'
import CenterLine from './ccpns/CenterLine.vue'
import Rank from './ccpns/Rank.vue'
import YearRank from './ccpns/YearRank.vue'
import ContPair from './ccpns/ContPair.vue'

const refScreen = ref()
const getScreen = (w: number = 1920, h: number = 1080) => {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
onMounted(() => {
  refScreen.value.style.transform = `scale(${getScreen()}) translate(-50%,-50%)`
})

window.onresize = () => {
  refScreen.value.style.transform = `scale(${getScreen()}) translate(-50%,-50%)`
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 1920px;
    height: 1080px;
    transform-origin: left top;
    .bottom {
      display: flex;
      height: 1040px;
      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        .tourist {
          flex: 1.2;
        }
        .sex,
        .age {
          flex: 1;
        }
      }
      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        .map {
          flex: 4;
        }
        .line {
          flex: 1;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        .rank {
          flex: 1.2;
        }
        .yearrank {
          flex: 1;
        }
        .contpair {
          flex: 1;
        }
      }
    }
  }
}
</style>
