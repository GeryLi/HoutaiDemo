// 登录接口携带的参数
export interface loginForm {
  username: string
  password: string
}

interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 定义用户登录接口返回信息

export interface LoginResponseData extends ResponseData {
  data: string
}
// 定义获取用户信息返回信息
export interface UserInfoResponseData extends ResponseData {
  data: {
    avatar: string
    buttons: string[]
    name: string
    roles: string[]
    routes: string[]
  }
}
