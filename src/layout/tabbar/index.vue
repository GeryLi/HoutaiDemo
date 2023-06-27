<template>
  <div class="theader">
    <div class="tleft">
      <!-- 控制左侧菜单栏收缩 -->
      <el-icon style="margin: 0 10px" @click="handIsOpen">
        <component :is="settingStore.isOpen ? 'Fold' : 'Expand'"></component>
      </el-icon>

      <!-- 面包屑 -->
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="item in $route.matched"
          :key="item.meta.title"
          :to="{ path: item.path }"
          v-show="item.meta.title"
        >
          <!-- 图标 -->
          <el-icon :size="12">
            <component :is="item.meta.icon"></component>
          </el-icon>

          <!-- 文本 -->
          <span style="margin-left: 2px">
            {{ item.meta.title }}
          </span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tright">
      <!-- 按钮 -->
      <el-button icon="Refresh" circle @click="changeRefrsh" />
      <el-button icon="FullScreen" circle @click="changFull" />

      <el-popover
        placement="top-start"
        :width="200"
        trigger="click"
        content="this is content, this is content, this is content"
      >
        <el-form>
          <el-form-item label="主题颜色">
            <el-color-picker
              v-model="color"
              show-alpha
              :predefine="predefineColors"
              @change="setCloor"
            />
          </el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch
              v-model="settingStore.isDark"
              active-icon="MoonNight"
              inactive-icon="Sunny"
              inline-prompt
              @change="swChange"
            />
          </el-form-item>
        </el-form>

        <template #reference>
          <el-button
            icon="Setting"
            @click=""
            circle
            style="margin-right: 10px"
          />
        </template>
      </el-popover>

      <!-- 头像 -->
      <el-avatar :size="36" :src="userStore.avatar" />

      <!-- 下拉菜单 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup name="Tabbar">
import { useSettingStore } from '@/store/module/useSeetingStore'
import useUserStore from '@/store/module/userStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const settingStore = useSettingStore()
const userStore = useUserStore()
const router = useRouter()

// 控制左侧menu收缩
const handIsOpen = () => {
  settingStore.changeIsopen()
}

// 控制刷新
const changeRefrsh = () => {
  settingStore.changeRefrsh()
}

// 控制全屏
const changFull = () => {
  //  全屏返回true 否则返回fales
  let full = document.fullscreenElement
  if (!full) document.documentElement.requestFullscreen()
  if (full) document.exitFullscreen()
}
//  退出登录
const logout = async () => {
  await userStore.userLogout()
  router.push('/login')
}

// 颜色组件需要的数据
const color = ref('rgba(30, 144, 255, 1)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

//暗黑模式
const swChange = () => {
  settingStore.changeDark()
  let html = document.documentElement
  if (settingStore.isDark) {
    html.className = 'dark'
  } else {
    html.className = ''
  }
}

// 设置主题颜色
const setCloor = () => {
  let el = document.documentElement
  el.style.setProperty('--el-color-primary', color.value)
}
</script>

<style scoped lang="scss">
.theader {
  height: 100%;
  display: flex;
  justify-content: space-between;
  .tleft {
    display: flex;
    align-items: center;
  }
  .tright {
    display: flex;
    align-items: center;
  }
}
</style>
