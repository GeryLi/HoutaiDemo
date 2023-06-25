import request from '@/utils/request'
import { SkuResData, SkuResInfoData } from './type'

enum API {
  //获取sku属性
  SKU_URL = '/admin/product/list/',

  //上架商品
  SALE_URL = 'admin/product/onSale/',

  // 下架商品
  CANCELSALE_URL = '/admin/product/cancelSale/',

  // 获取商品详情 ID
  SKUINFO_URL = '/admin/product/getSkuInfo/',

  // 删除sku接口
  DELETESKU_URL = '/admin/product/deleteSku/',
}
export const reqSku = (page: number, limit: number) =>
  request.get<any, SkuResData>(API.SKU_URL + `${page}/${limit}`)

// 商品上架
export const reqSale = (skuId: number) =>
  request.get<any, any>(API.SALE_URL + skuId)

//商品下架
export const reqCanCelSale = (skuId: number) =>
  request.get<any, any>(API.CANCELSALE_URL + skuId)

//获取skuinfo
export const reqSkuInFo = (skuId: number) =>
  request.get<any, SkuResInfoData>(API.SKUINFO_URL + skuId)

// 删除sku
export const reqDeleteSku = (skuId: number) =>
  request.delete<any, any>(API.DELETESKU_URL + skuId)
