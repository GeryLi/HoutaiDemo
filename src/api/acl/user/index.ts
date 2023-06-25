//用户管理模块的接口

import request from '@/utils/request'
import type { User, UserResData } from './type'

enum API {
  // 获取用户信息  page/limit
  ALLUSER_URL = '/admin/acl/user/',

  // 添加用户 POST
  ADDUSER_URL = 'admin/acl/user/save',
  // 更新用户信息 PUT
  UPDATEUSER_URL = '/admin/acl/user/update',
}

// 获取用户信息  page/limit
export const reqGetUser = (page: number, limit: number) =>
  request.get<any, UserResData>(API.ALLUSER_URL + `${page}/${limit}`)

export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    //更新用户
    return request.put(API.UPDATEUSER_URL, data)
  } else {
    //新增用户
    return request.post(API.ADDUSER_URL, data)
  }
}
