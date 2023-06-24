import { createApp } from 'vue'

import App from './App.vue'
import ElementPlus from 'element-plus'
//@ts-ignore 配置国际化中文
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 配置svg图标插件
import 'virtual:svg-icons-register'

import '@/styles/index.scss'

import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import router from './router'
import pinia from './store'
import './permisstion'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(router)
  .use(pinia)
  .mount('#app')
