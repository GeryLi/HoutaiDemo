import request from '@/utils/request'
import { MenuResData, RoleData, RoleResponseData } from './type'

// 角色管理模块接口
enum API {
  // 全部角色的数据
  ALLROLE_URL = '/admin/acl/role/',

  // 新增职位 POST
  ADDROLE_URL = '/admin/acl/role/save',

  // 新增职位
  UPDATEROLE_URL = '/admin/acl/role/update',

  // 获取全部菜单与按钮权限数据
  ALLPERMISSTION_URL = '/admin/acl/permission/toAssign/',

  //给相应的职位分配权限
  SETPERMISTION_URL = '/admin/acl/permission/doAssign/?',

  //删除相关的权限
  DELETEPERMISTION_URL = '/admin/acl/role/remove/',
}

export const reqAllRoleList = (
  page: number,
  limit: number,
  searchName: string,
) =>
  request.get<any, RoleResponseData>(
    API.ALLROLE_URL + `${page}/${limit}/?roleName=${searchName}`,
  )

export const reqAddOrUpdate = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}

export const reqAllMenuList = (id: number) =>
  request.get<any, MenuResData>(API.ALLPERMISSTION_URL + id)

export const reqSetPermisston = (roleId: number, permissionId: number[]) =>
  request.post(
    API.SETPERMISTION_URL + `roleId=${roleId}&permissionId=${permissionId}`,
  )

export const reqDeletePermisston = (id: number) =>
  request.delete<any, any>(API.DELETEPERMISTION_URL + id)
