//用户管理模块的接口

import request from '@/utils/request'
import type { ResRoleDate, SetRoleData, User, UserResData } from './type'

enum API {
  // 获取用户信息  page/limit
  ALLUSER_URL = '/admin/acl/user/',

  // 添加用户 POST
  ADDUSER_URL = 'admin/acl/user/save',

  // 更新用户信息 PUT
  UPDATEUSER_URL = '/admin/acl/user/update',

  // 用户权限获取 ID
  ALLROLES_URL = '/admin/acl/user/toAssign/',

  //给已有的用户分配角色接口
  SETROLE_URL = '/admin/acl/user/doAssignRole',

  //根据id删除用户
  DELETEUSER_URL = '/admin/acl/user/remove/',

  //批量删除用户
  DELETESELECTUSER_URL = '/admin/acl/user/batchRemove',
}

// 获取用户信息  page/limit
export const reqGetUser = (page: number, limit: number, username: string) =>
  request.get<any, UserResData>(
    API.ALLUSER_URL + `${page}/${limit}/?username=${username}`,
  )

export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    //更新用户
    return request.put(API.UPDATEUSER_URL, data)
  } else {
    //新增用户
    return request.post(API.ADDUSER_URL, data)
  }
}

// 根据id获取用户权限
export const reqAllRoles = (userId: number) =>
  request.get<any, ResRoleDate>(API.ALLROLES_URL + userId)

export const reqserRoles = (data: SetRoleData) =>
  request.post<any, any>(API.SETROLE_URL, data)

export const reqDeleteUser = (id: number) =>
  request.delete<any, any>(API.DELETEUSER_URL + id)

export const reqDeleteSelectUser = (idArr: number[]) =>
  request.delete<any, any>(API.DELETESELECTUSER_URL, { data: idArr })
