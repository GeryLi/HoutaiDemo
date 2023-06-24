interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//  品牌数据类型
export interface TradeMake {
  id?: number
  tmName: string
  logoUrl: string
}
//
export type Records = TradeMake[]

export interface tradeMakeResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
    searchCount: number
  }
}
