import request from '@/utils/request'
import type { loginForm, LoginResponseData, UserInfoResponseData } from './type'
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 登录接口
export const Login = (data: loginForm) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data)

// 获取用户信息
export const getUserInfo = () =>
  request.get<any, UserInfoResponseData>(API.USERINFO_URL)
export const LogOut = () => request.post<any, any>(API.LOGOUT_URL)
