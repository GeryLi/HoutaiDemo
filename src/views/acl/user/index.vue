<template>
  <el-card shadow="always" style="height: 80px">
    <el-form label-width="80px" :inline="true" size="normal" class="formHeader">
      <el-form-item label="用户名:">
        <el-input
          placeholder="请输入搜索的用户名"
          v-model="searchValue"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
          @click="handSearch"
          :disabled="!searchValue"
        >
          搜索
        </el-button>
        <el-button
          type="primary"
          size="default"
          @click="useSettingStore().refrsh = !useSettingStore().refrsh"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card shadow="always" style="margin-top: 10px">
    <el-button type="primary" size="default" @click="addUser">
      添加用户
    </el-button>
    <el-button
      type="primary"
      size="default"
      @click="deleteSlectUser"
      :disabled="!deleteIdArr.length"
    >
      批量删除
    </el-button>

    <el-table
      border
      stripe
      style="margin-top: 10px"
      :data="userArr"
      @selection-change="selectChange"
    >
      <el-table-column
        prop=""
        align="center"
        type="selection"
      ></el-table-column>
      <el-table-column
        prop=""
        align="center"
        type="index"
        label="#"
      ></el-table-column>
      <el-table-column
        prop="id"
        align="center"
        label="id"
        width="80px"
      ></el-table-column>
      <el-table-column
        prop="username"
        align="center"
        label="用户名字"
      ></el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="用户名称"
      ></el-table-column>
      <el-table-column
        prop="roleName"
        align="center"
        label="用户角色"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        label="创建时间"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        align="center"
        label="更新时间"
      ></el-table-column>
      <el-table-column prop="" align="center" label="操作" width="300">
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="User"
            @click="handRole(row)"
          >
            分配角色
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="edit"
            @click="updateUser(row)"
          >
            编辑
          </el-button>

          <el-popconfirm
            :title="`确定要删除${row.username}吗？`"
            @confirm="handDeleteUser(row)"
            width="260"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="delete">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15]"
      layout="prev, pager, next, jumper, ->,sizes,total"
      :total="total"
      @size-change="sizeChange"
      @current-change="getUserData"
      :background="true"
    />
  </el-card>

  <!-- // 用户新增和编辑 -->
  <el-dialog
    v-model="isShow"
    :title="userParams.id ? '修改用户信息' : '添加用户'"
    width="30%"
    @close=""
  >
    <el-form
      label-width="100px"
      :inline="false"
      size="normal"
      :model="userParams"
      :rules="rules"
      style="margin-bottom: 20px"
      ref="formRef"
    >
      <el-form-item label="用户姓名:" prop="username">
        <el-input
          placeholder="请输入用户姓名"
          v-model="userParams.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户昵称:" prop="name">
        <el-input
          placeholder="请输入用户昵称"
          v-model="userParams.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户密码:" prop="password" v-show="!userParams.id">
        <el-input
          placeholder="请输入用户密码"
          v-model="userParams.password"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" style="display: flex; justify-content: end">
      <el-button @click="dlgCancel">取消</el-button>
      <el-button type="primary" @click="saveUser">确定</el-button>
    </span>
  </el-dialog>

  <!-- 权限分配 -->
  <el-drawer
    title="分配权限"
    v-model="draShow"
    size="30%"
    :destroy-on-close="true"
    :show-close="true"
    :wrapperClosable="true"
  >
    <template #header></template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名 : " size="normal">
          <el-input v-model="userParams.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <el-checkbox-group
            v-model="checkedRole"
            @change="handleCheckedRolesChange"
          >
            <el-checkbox v-for="role in roleList" :key="role" :label="role">
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button type="primary" size="default" @click="draShow = false">
        取消
      </el-button>
      <el-button type="primary" size="default" @click="saveRole">
        确定
      </el-button>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { ref } from 'vue'
import {
  reqGetUser,
  reqAddOrUpdateUser,
  reqAllRoles,
  reqserRoles,
  reqDeleteUser,
  reqDeleteSelectUser,
} from '@/api/acl/user/index'
import type {
  UserResData,
  Records,
  User,
  ResRoleDate,
  AllRole,
  SetRoleData,
} from '@/api/acl/user//type'
import { reactive, nextTick } from 'vue'
import { useSettingStore } from '@/store/module/useSeetingStore'
// 收集用户数据
let searchValue = ref<string>('')
const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(10)
const userArr = ref<Records>([])
// dlog isShow
const isShow = ref<boolean>(false)
// draShow isShow
const draShow = ref<boolean>(false)
// 复选框全选
const checkAll = ref<boolean>(false)
// 设置不确定状态样式
const isIndeterminate = ref<boolean>(true)

// 存储批量删除用户id
const deleteIdArr = ref<number[]>([])

// 复选框值
const roleList = ref<AllRole>([])
// 绑定复选框的数组
const checkedRole = ref<AllRole>([])

//formref 对象
const formRef = ref<any>()

//  收集用户数据
const userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})
// 自定义Username 校验规则
const validatorUsername = (_rule: any, value: string, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户名字长度不能小于5位'))
  }
}
const validatoname = (_rule: any, value: string, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户昵称长度不能小于5位'))
  }
}
const validatopasswd = (_rule: any, value: string, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('密码长度不能小于6位'))
  }
}

// 表单的校验规则
const rules = {
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  name: [{ required: true, trigger: 'blur', validator: validatoname }],
  password: [{ required: true, trigger: 'blur', validator: validatopasswd }],
}

// 添加用户
const addUser = () => {
  userParams.username = ''
  userParams.name = ''
  userParams.password = ''
  userParams.id = 0
  isShow.value = !isShow.value
  nextTick(() => formRef.value.clearValidate())
}
const dlgCancel = () => {
  isShow.value = !isShow.value
}

// 更新用户
const updateUser = (user: User) => {
  isShow.value = !isShow.value
  Object.assign(userParams, user)
  nextTick(() => formRef.value.clearValidate())
}

// 删除用户
const handDeleteUser = async (user: User) => {
  let res: any = await reqDeleteUser(user.id as number)
  if (res.code == 200) {
    ElMessage.success('删除成功~')
    getUserData()
  } else {
    ElMessage.error('删除失败~')
  }
}
// 删除多选发生变化
const selectChange = (val: any) => {
  deleteIdArr.value = val.map((item: any) => item.id as number)
}
// 批量删除数据
const deleteSlectUser = async () => {
  let res = await reqDeleteSelectUser(deleteIdArr.value)
  if (res.code == 200) {
    ElMessage.success('批量删除成功~')
    getUserData()
  } else {
    ElMessage.error('批量删除失败~')
  }
}

// 保存发送请求
const saveUser = async () => {
  // 先进性表单校验
  await formRef.value.validate()

  let res: any = await reqAddOrUpdateUser(userParams)
  if (res.code == 200) {
    ElMessage.success(userParams.id ? '更新成功~' : '添加成功~')
    isShow.value = !isShow.value
    getUserData(userParams.id ? currentPage.value : 1)
    window.location.reload()
  } else {
    ElMessage.error(userParams.id ? '更新失败~' : `添加失败~`)
    isShow.value = !isShow.value
  }
}

// 分配角色
const handRole = async (row: User) => {
  Object.assign(userParams, row)
  let res: ResRoleDate = await reqAllRoles(row.id as number)
  if (res.code == 200) {
    roleList.value = res.data.allRolesList
    checkedRole.value = res.data.assignRoles
    draShow.value = !draShow.value
  }
}
// 保存分配角色
const saveRole = async () => {
  // 收集数据
  let data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: checkedRole.value.map((item) => item.id as number),
  }

  let res = await reqserRoles(data)
  if (res.code == 200) {
    ElMessage.success('修改成功')
    draShow.value = !draShow.value
    getUserData()
  } else {
    ElMessage.error('修改失败')
  }
}
// 全选复选框的change事件
const handleCheckAllChange = (val: boolean) => {
  checkedRole.value = val ? roleList.value : []
  isIndeterminate.value = false
}
const handleCheckedRolesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === roleList.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < roleList.value.length
}

// 搜索
const handSearch = () => {
  getUserData()
  searchValue.value = ''
}
onMounted(() => getUserData())

//请求数据
const getUserData = async (page = 1) => {
  currentPage.value = page
  let res: UserResData = await reqGetUser(
    currentPage.value,
    pageSize.value,
    searchValue.value,
  )
  if (res.code == 200) {
    total.value = res.data.total
    userArr.value = res.data.records
  }
}
// sizeChange
const sizeChange = () => getUserData()

// getSkuData  改变页码
</script>

<style scoped lang="scss">
.formHeader {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
