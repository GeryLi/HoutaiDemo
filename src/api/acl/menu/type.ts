export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface Permission {
  id?: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: null
  tocode: null
  type: number
  status: null
  level: number
  children?: PermissionArr
  select: boolean
}

export type PermissionArr = Permission[]

export interface PerResData extends ResponseData {
  data: PermissionArr
}
export interface sendPerData {
  id?: number
  level: number
  code: string
  name: string
  pid: number
}
