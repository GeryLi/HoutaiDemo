import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from './routes'

let router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
