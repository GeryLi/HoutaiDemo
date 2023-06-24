import request from '@/utils/request'
import type { AttrResponse, CatGoryResData, Attr } from './type'

enum API {
  // 获取一级分类数据
  C1_URL = '/admin/product/getCategory1',

  // 获取二级分类数据
  C2_URL = '/admin/product/getCategory2/',

  // 获取三级分类数据
  C3_URL = '/admin/product/getCategory3/',

  // 获取对应数据下属性和属性值
  ATTR_URL = '/admin/product/attrInfoList/',

  // 更新属性值或者新增
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',

  // 删除属性的接口
  DELETEATTR_URL = '/admin/product/deleteAttr/',
}

export const reqC1 = () => request.get<any, CatGoryResData>(API.C1_URL)

export const reqC2 = (c1id: number | string) =>
  request.get<any, CatGoryResData>(API.C2_URL + c1id)

export const reqC3 = (c2id: number | string) =>
  request.get<any, CatGoryResData>(API.C3_URL + c2id)

export const getAttrInfo = (
  c1id: number | string,
  c2id: number | string,
  c3id: number | string,
) => request.get<any, AttrResponse>(API.ATTR_URL + `${c1id}/${c2id}/${c3id}`)

export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<any, any>(API.ADDORUPDATEATTR_URL, data)

export const reqDeleteAttr = (id: number) =>
  request.delete<any, any>(API.DELETEATTR_URL + id)
