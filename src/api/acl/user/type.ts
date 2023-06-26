export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface User {
  id?: number
  createTime?: string
  updateTime?: string
  username: string
  password: string
  name: string
  phone?: null
  roleName?: string
}

// 用户对象
export type Records = User[]

// 接口返回的接口类型
export interface UserResData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}

// 职位的ts类型
export interface RoleDate {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null
}

//职位列表的数组
export type AllRole = RoleDate[]

// 获取role返回数据类型
export interface ResRoleDate extends ResponseData {
  data: {
    assignRoles: AllRole
    allRolesList: AllRole
  }
}

// 分配职位接口携带参数类型
export interface SetRoleData {
  roleIdList: number[]
  userId: number
}
