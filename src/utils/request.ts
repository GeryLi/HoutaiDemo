import useUserStore from '@/store/module/userStore'
import axios from 'axios'
//@ts-ignore
import { ElMessage } from 'element-plus'

console.log()

let request = axios.create({
  //基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API,

  //超时设置
  timeout: 5000,
})

//  请求拦截器
request.interceptors.request.use((config) => {
  //config 配置对象，headers属性请求头，给服务端携带公共参数
  let userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  return config
})

//  响应拦截器 成功回调 和 失败回调
request.interceptors.response.use(
  (response) => {
    //成功回调
    return response.data
  },
  (error) => {
    //失败回调 处理http网络错误
    let message = ''
    let status = error.response.status
    switch (status) {
      case 401:
        message = 'token过期了~'
        break
      case 403:
        message = '无权访问~'
        break
      case 404:
        message = '请求地址错误~'
        break
      case 500:
        message = '服务器出现错误~'
        break
      default:
        message = '网络错误~'
        break
    }
    ElMessage({
      message,
      type: 'error',
    })
    return Promise.reject(error)
  },
)

export default request
