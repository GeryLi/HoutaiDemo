import request from '@/utils/request'
import { tradeMakeResponseData, TradeMake } from './type'

//  品牌管理解构
enum API {
  // 获取已有接口 url
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  DELDATETRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}
// 参数页码和条数
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, tradeMakeResponseData>(
    API.TRADEMARK_URL + `/${page}/${limit}`,
  )

export const reqAddTrademark = (data: TradeMake) => {
  // 修改品牌数据
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    // 新增更新品牌数据
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}
export const delTrademark = (id: number) =>
  request.delete(API.DELDATETRADEMARK_URL + id)
