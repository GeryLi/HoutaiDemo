//创建用户小仓库
import { Login, getUserInfo, LogOut } from '@/api/user'
import { defineStore } from 'pinia'
import { getToken, setToken } from '@/utils/token'
import type { stateData } from '../types/type'
import { constantRoutes, asyncRoutes, anyRoute } from '@/router/routes'
import {
  loginForm,
  LoginResponseData,
  UserInfoResponseData,
} from '@/api/user/type'
import router from '@/router'
import cloneDeep from 'lodash/cloneDeep'
import { log } from 'console'

//filterAsyncRoute 过滤异步路由  递归过滤
function filterAsyncRoute(asyncRoutes: any, routes: any) {
  return asyncRoutes.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

// 引入路由数据

const useUserStore = defineStore('User', {
  state: (): stateData => {
    return {
      token: getToken(),
      menuRoutes: constantRoutes,
      username: localStorage.getItem('username') as string,
      avatar: localStorage.getItem('avatar') as string,
      buttons: [],
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      let res: LoginResponseData = await Login(data)

      if (res.code == 200) {
        this.token = res.data as string
        setToken(res.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data))
      }
    },
    async getInfo() {
      let res: UserInfoResponseData = await getUserInfo()
      if (res.code === 200) {
        this.username = res.data.name
        this.avatar = res.data.avatar
        this.buttons = res.data.buttons

        let userAsyncRoutes = filterAsyncRoute(
          cloneDeep(asyncRoutes),
          res.data.routes,
        )
        let newArr = [...constantRoutes, ...userAsyncRoutes, anyRoute]
        this.menuRoutes = newArr
        newArr.forEach((route: any) => router.addRoute(route))

        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async userLogout() {
      let res: any = await LogOut()

      if (res.code === 200) {
        this.username = ''
        this.avatar = ''
        this.token = ''
        this.menuRoutes = []
        localStorage.clear()

        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
