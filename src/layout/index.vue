<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="layout_aside" :class="{ active: !settingStore.isOpen }">
        <Logo />
        <div class="scroll_bar">
          <el-scrollbar>
            <el-menu
              background-color="#001529"
              text-color="white"
              :default-active="$route.path"
              :router="true"
              :collapse="!settingStore.isOpen"
            >
              <Menu :menuList="useStore.menuRoutes" />
            </el-menu>
          </el-scrollbar>
        </div>
      </el-aside>

      <el-container>
        <el-header class="layout_header">
          <Tabbar />
        </el-header>
        <el-main class="layout_main">
          <div class="main_box">
            <Main></Main>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import useUserStore from '@/store/module/userStore'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import { useSettingStore } from '@/store/module/useSeetingStore'

const useStore = useUserStore()
const settingStore = useSettingStore()
</script>

<style scoped lang="scss">
.common-layout {
  overflow: auto;

  .layout_header {
    height: $base-tabbar-height;
    border-bottom: 1px solid #c2c2c2;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.22);
  }
  .layout_aside {
    background-color: $base-menu-background;
    height: 100vh;
    width: $base-menu-width;
    transition: all 1s;
    .el-menu {
      border-right: none;
    }
    .scroll_bar {
      height: calc(100vh - 50px);
    }
  }
  .active {
    width: 65px;
  }

  .layout_main {
    height: calc(100vh - $base-tabbar-height);

    .main_box {
      padding: 20px;
      overflow: auto;
    }
  }
}
</style>
