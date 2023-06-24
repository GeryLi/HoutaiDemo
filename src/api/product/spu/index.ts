import request from '@/utils/request'
import {
  HasSpuResponseData,
  AllTradMark,
  ReqSpuImage,
  ReqSpuSaleAttr,
  AllSaleAttr,
  SpuData,
  AddSkuData,
} from './type'

enum API {
  // 获取已有spu数据
  HASSPU_URL = '/admin/product/',

  // 获取全部品牌的数据
  ALLTRADMARK_URL = '/admin/product/baseTrademark/getTrademarkList',

  // 根据id获取某一个spu下的商品图片
  IMAGE_URL = '/admin/product/spuImageList/',

  // 根据id获取某一个spu下已有的销售属性
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',

  // 获取整个项目全部的销售属性
  ALLSEALATTR_URL = '/admin/product/baseSaleAttrList',

  // 追加和更新spu
  ADDORUPDATESPU_URL = 'admin/product/saveSpuInfo',

  // 追加sku
  ADDSKU_URL = '/admin/product/saveSkuInfo',
}
// 获取已有spu数据
export const reqHasSpu = (page: number, limit: number, c3Id: number | string) =>
  request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${c3Id}`,
  )

// 获取全部品牌的数据
export const reqAllTradMark = () =>
  request.get<any, AllTradMark>(API.ALLTRADMARK_URL)

// 根据id获取某一个spu下的商品图片
export const reqImageList = (spuId: number) =>
  request.get<any, ReqSpuImage>(API.IMAGE_URL + spuId)

// 根据id获取某一个spu下已有的销售属性
export const reqHasSaleAttr = (spuId: number) =>
  request.get<any, ReqSpuSaleAttr>(API.SPUHASSALEATTR_URL + spuId)

// 获取全部的销售属性
export const reqAllSaleAttr = () =>
  request.get<any, AllSaleAttr>(API.ALLSEALATTR_URL)

// 添加新的spu接口
export const reqAddOrUpdateSpu = (data: SpuData) =>
  request.post<any, any>(API.ADDORUPDATESPU_URL, data)

// 添加sku
export const reqAddSku = (data: AddSkuData) =>
  request.post<any, any>(API.ADDSKU_URL, data)
