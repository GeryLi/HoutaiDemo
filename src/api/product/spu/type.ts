// 服务器全部接口返回的数据蕾西
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// spu数据类型
export interface SpuData {
  id?: number
  spuName: string
  description: string
  category3Id: string | number
  tmId: number | string
  spuSaleAttrList: null | SpuSaleAttr[]
  spuImageList: SpuImage[] | null
}

// spu数组
export type Records = SpuData[]

// 定义spu接口返回的数据蕾西
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

// 所有品牌数据的ts类型
export interface TradMark {
  id: string | number
  logoUrl: string
  tmName: string
}

// 品牌接口返回的接口类型
export interface AllTradMark extends ResponseData {
  data: TradMark[]
}

// 商品图片的数据类型
export interface SpuImage {
  id?: number | string
  spuId?: number
  imgName?: string
  imgUrl?: string
  name?: string
  url?: string
}

// 商品图片返回数据类型
export interface ReqSpuImage extends ResponseData {
  data: SpuImage[]
}

// 商品属性值的数据类型
export interface SpuSaleAttrValueList {
  id?: number | string
  spuId?: number
  baseSaleAttrId: number | String
  saleAttrName?: string
  spuSaleAttrValueName?: string
  isChecked?: null
  createTime?: null
  updateTime?: null
  saleAttrValue?: string
  saleAttrValueName?: string
}

// 商品属性的数据类型
export interface SpuSaleAttr {
  id?: number | string
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValueList[]
  createTime?: null
  updateTime?: null
  flag?: boolean
  saleAttrValue?: string
  saleIdAndValue?: string
}

// 返回商品属性的数据类型
export interface ReqSpuSaleAttr extends ResponseData {
  data: SpuSaleAttr[]
}

export interface AllSaleAttrData {
  id: number
  name: string
}
// 返回所有Spu的数据蕾西
export interface AllSaleAttr extends ResponseData {
  data: AllSaleAttrData[]
}

export interface SkuAttrValueList {
  attrId: number | string
  valueId: number | string
  attrName?: string
  id?: number
  skuId?: number
  valueName?: string
}

export interface SkuSaleAttrValueList {
  saleAttrId: number | string
  saleAttrValueld: number | string
}

export interface AddSkuData {
  category3Id: number | string
  spuId: number | string
  tmId: number | string
  skuName: string
  price: number | string
  weight: number | string
  skuDesc: string
  skuDefaultImg: string
  skuAttrValueList?: SkuAttrValueList[]
  skuSaleAttrValueList?: SkuSaleAttrValueList[]
}

// skuinfo
export interface SkuInfoDate extends ResponseData {
  data: AddSkuData[]
}
