export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface CatGoryobj {
  id: number | string
  name: string
  catgory1ID?: Number
  catgory2ID?: Number
}

export interface CatGoryResData extends ResponseData {
  data: CatGoryobj[]
}

// 存储属性值的对象
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}
// 存储属性值的对象数组
export type AttrValueArr = AttrValue[]

// 属性对象
export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueArr
  attrIdandValue?: string
}
// 存储每一个属性对象的数组类型
export type attrArray = Attr[]
export interface AttrResponse extends ResponseData {
  data: Attr[]
}
