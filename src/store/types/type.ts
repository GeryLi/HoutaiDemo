import type { RouteRecordRaw } from 'vue-router'
export interface stateData {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}
