import request from '@/utils/request'
import { PerResData, sendPerData } from './type'
enum API {
  // 获取全部菜单和标识的按钮数据
  ALLPERMISSTION_URL = '/admin/acl/permission',

  // 添加菜单 post
  ADDMENU_URL = '/admin/acl/permission/save',

  // 添加菜单 put
  UPDATE_URL = '/admin/acl/permission/update',

  // 删除菜单
  DELETE_URL = '/admin/acl/permission/remove/',
}

export const reqAllPermisstion = () =>
  request.get<any, PerResData>(API.ALLPERMISSTION_URL)
export const reqAddOrUpdatePer = (data: sendPerData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_URL, data)
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data)
  }
}
export const reqRemovePer = (id: number) =>
  request.delete<any, any>(API.DELETE_URL + id)
