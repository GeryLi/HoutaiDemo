// 服务器全部接口返回的数据蕾西
export interface ResponseData {
  code: number
  message: string
  ok: boolean
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
  saleAttrName?: string
}

export interface ImgList {
  id: number
  imgName: string
  imgUrl: string
  isDefault: number
  skuId: number
  spuImgId: number
}
export interface AddSkuData {
  id?: number
  category3Id?: number | string
  spuId?: number | string
  tmId?: number | string
  skuName?: string
  price?: number | string
  weight?: number | string
  skuDesc?: string
  skuDefaultImg?: string
  isSale?: number

  skuAttrValueList?: SkuAttrValueList[]
  skuSaleAttrValueList?: SkuSaleAttrValueList[]
  skuImageList?: ImgList[]
}

export interface SkuResData extends ResponseData {
  data: {
    records: AddSkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

// skuinfo 接口
export interface SkuResInfoData extends ResponseData {
  data: AddSkuData
}
