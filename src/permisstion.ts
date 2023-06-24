import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from './store'
import useUserStore from './store/module/userStore'
nprogress.configure({ showSpinner: false })
//获取仓库  在组建外部 必须传入大仓库
const userStore = useUserStore(pinia)
//前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = to.meta.title
  nprogress.start()

  // 获取用户信息 以用户名为判断依据
  if (userStore.token) {
    // 登录成功 想访问login 重定向到/
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      // 有用户信息 放行
      if (userStore.username) {
        next()

        // 没有用户信息则获取信息
      } else {
        try {
          await userStore.getInfo()
          next()
        } catch (error) {
          //TOKEN 过期
          // token 被修改
          // 清空用户数据

          userStore.userLogout()
          // 重定向回login
          next({ path: '/login' })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

//后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})
