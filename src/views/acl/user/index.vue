<template>
  <el-card shadow="always" style="height: 80px">
    <el-form label-width="80px" :inline="true" size="normal" class="formHeader">
      <el-form-item label="用户名:">
        <el-input placeholder="请输入搜索的用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="">搜索</el-button>
        <el-button type="primary" size="default" @click="">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card shadow="always" style="margin-top: 10px">
    <el-button type="primary" size="default" @click="addUser">
      添加用户
    </el-button>
    <el-button type="primary" size="default" @click="">批量删除</el-button>

    <el-table border stripe style="margin-top: 10px" :data="userArr">
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
          <el-button type="primary" size="small" icon="User" @click="">
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
          <el-button type="primary" size="small" icon="delete" @click="">
            删除
          </el-button>
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
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { ref } from 'vue'
import { reqGetUser, reqAddOrUpdateUser } from '@/api/acl/user/index'
import type { UserResData, Records, User } from '@/api/acl/user//type'
import { reactive, nextTick } from 'vue'

const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(10)
const userArr = ref<Records>([])
// dlog isShow
const isShow = ref<boolean>(false)

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

onMounted(() => getUserData())

//请求数据
const getUserData = async (page = 1) => {
  currentPage.value = page
  let res: UserResData = await reqGetUser(currentPage.value, pageSize.value)
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
