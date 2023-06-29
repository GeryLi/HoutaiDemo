<template>
  <el-card shadow="always" style="height: 80px">
    <el-form label-width="80px" :inline="true" size="normal" class="formHeader">
      <el-form-item label="职位搜索:">
        <el-input
          placeholder="请输入搜索职位的关键字"
          v-model="searchValue"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
          @click="getRole()"
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

  <el-card style="margin-top: 10px">
    <el-button type="primary" size="default" icon="plus" @click="addRole">
      添加职位
    </el-button>
    <el-table border stripe style="margin: 10px 0" :data="recordsArray">
      <el-table-column align="center" type="index" label="#"></el-table-column>
      <el-table-column align="center" label="id" prop="id"></el-table-column>
      <el-table-column
        align="center"
        label="角色名称"
        prop="roleName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
        prop="createTime"
      ></el-table-column>
      <el-table-column
        align="center"
        label="更新时间"
        prop="updateTime"
      ></el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="roleSet(row)"
            icon="User"
          >
            分配角色
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="edit"
            @click="editRole(row)"
          >
            编辑
          </el-button>

          <el-popconfirm
            :title="`确定要删除${row.roleName}吗？`"
            @confirm="deletePer(row)"
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
      @current-change="getRole"
      :background="true"
    />
  </el-card>

  <!-- 添加和更新 -->
  <el-dialog
    :title="roleParams.id ? '编辑职位' : '增加职位'"
    width="30%"
    v-model="dloShow"
  >
    <el-form :model="roleParams" :rules="rules" ref="formRef">
      <el-form-item label="职位名称:" prop="roleName">
        <el-input v-model="roleParams.roleName"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button @click="dloShow = false">取消</el-button>
      <el-button type="primary" @click="saveRole">确定</el-button>
    </span>
  </el-dialog>

  <el-drawer title="权限分配" v-model="draShow">
    <template #default>
      <!-- 树形控件 -->
      <el-tree
        :data="menuArr"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="filterArr"
        :props="defaultProps"
        ref="formTree"
      />
    </template>

    <template #footer>
      <el-button type="primary" size="default" @click="draShow = false">
        取消
      </el-button>
      <el-button type="primary" size="default" @click="saveSetPer">
        确定
      </el-button>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useSettingStore } from '@/store/module/useSeetingStore'
import {
  reqAddOrUpdate,
  reqAllMenuList,
  reqAllRoleList,
  reqDeletePermisston,
  reqSetPermisston,
} from '@/api/acl/role'
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'

import {
  MenuList,
  MenuResData,
  Records,
  RoleData,
  RoleResponseData,
} from '@/api/acl/role/type'
import { reactive } from 'vue'
import { nextTick } from 'vue'
const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const searchValue = ref<string>('')
const total = ref<number>(10)
const dloShow = ref<boolean>(false)
const draShow = ref<boolean>(false)
const formRef = ref<any>()
const formTree = ref<any>()
const recordsArray = ref<Records>([])
// 收集数据
const roleParams = reactive<RoleData>({
  roleName: '',
})
// 定义数组 存取权限数据
const menuArr = ref<MenuList>([])
// 存储过滤出来的四级列表
const filterArr = ref<number[]>([])

// 校验规则函数
const validatorRoleName = (_rule: any, value: string, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('职位名称至少两位'))
  }
}
// 校验规则
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
}
const sizeChange = () => {
  getRole()
}
// 添加职位
const addRole = () => {
  roleParams.roleName = ''
  roleParams.id = 0
  dloShow.value = !dloShow.value
  nextTick(() => formRef.value.clearValidate())
}
// 编辑职位信息
const editRole = (row: RoleData) => {
  dloShow.value = !dloShow.value
  Object.assign(roleParams, row)
  // roleParams.id = row.id
  // roleParams.roleName = row.roleName
  nextTick(() => formRef.value.clearValidate())
}

// 发送请求
const getRole = async (page = 1) => {
  currentPage.value = page
  let res: RoleResponseData = await reqAllRoleList(
    currentPage.value,
    pageSize.value,
    searchValue.value,
  )
  if (res.code == 200) {
    total.value = res.data.total
    recordsArray.value = res.data.records
  }
}

// 保存职位
const saveRole = async () => {
  //表单校验通过才进行
  await formRef.value.validate()

  let res = await reqAddOrUpdate(roleParams)
  if (res.code == 200) {
    ElMessage.success(roleParams.id ? '更新成功' : '添加成功')
    dloShow.value = !dloShow.value
    getRole()
  } else {
    ElMessage.error(roleParams.id ? '更新失败' : '添加失败')
  }
}

const filterMenu = (menuArr: MenuList, initArr: any) => {
  // 递归遍历
  menuArr.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterMenu(item.children, initArr)
    }
  })
  return initArr
}

// roleSet 分配角色
const roleSet = async (row: RoleData) => {
  Object.assign(roleParams, row)
  let res: MenuResData = await reqAllMenuList(row.id as number)
  if (res.code == 200) {
    menuArr.value = res.data
    filterArr.value = filterMenu(menuArr.value, [])
    draShow.value = !draShow.value
  }
}
// 树形控件的数据
const defaultProps = {
  childen: 'childen',
  label: 'name',
}

// 保存权限分配
const saveSetPer = async () => {
  const roleld: number = roleParams.id as number
  //选中节点的id
  let arr = formTree.value.getCheckedKeys()
  //半选中的
  let arr1 = formTree.value.getHalfCheckedKeys()

  let res: any = await reqSetPermisston(roleld, [...arr, ...arr1])
  if (res.code) {
    draShow.value = !draShow.value
    ElMessage.success('分配成功~')
    window.location.reload()
  } else {
    ElMessage.error('分配失败~')
  }
}

// 删除角色 deletePer
const deletePer = async (row: RoleData) => {
  let res = await reqDeletePermisston(row.id as number)
  if (res.code == 200) {
    ElMessage.success('删除成功~')
    getRole(
      recordsArray.value.length > 1 ? currentPage.value : currentPage.value - 1,
    )
  } else {
    ElMessage.error('删除失败~')
  }
}

onMounted(() => getRole())
</script>

<style scoped lang="scss">
.formHeader {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
