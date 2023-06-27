<template>
  <el-table
    :data="perArr"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
  >
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="code" label="权限值" />
    <el-table-column prop="updateTime" label="Address" />
    <el-table-column label="Address">
      <template #="{ row }">
        <el-button
          v-show="!(row.level == 4)"
          type="primary"
          size="small"
          icon=""
          @click="addPer(row)"
        >
          {{ row.level == 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button
          type="primary"
          size="small"
          icon="Edit"
          @click="updatePer(row)"
          v-show="row.level != 1"
        >
          编辑
        </el-button>

        <el-popconfirm
          :title="`确定要删除${row.name}吗？`"
          @confirm="deletePer(row)"
          width="260"
        >
          <template #reference>
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              v-show="row.level != 1"
            >
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <!-- 添加和编辑 -->
  <el-dialog
    :title="perParams.id ? '编辑菜单' : '新增菜单'"
    width="25%"
    v-model="dlgShow"
  >
    <el-form label-width="80px">
      <el-form-item label="名称:">
        <el-input style="max-width: 300px" v-model="perParams.name"></el-input>
      </el-form-item>
      <el-form-item label="权限值:">
        <el-input style="max-width: 300px" v-model="perParams.code"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" style="display: flex; justify-content: end">
      <el-button @click="dlgShow = false">取消</el-button>
      <el-button type="primary" @click="sendPer">确定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  reqAllPermisstion,
  reqAddOrUpdatePer,
  reqRemovePer,
} from '@/api/acl/menu/index'
import type {
  PerResData,
  PermissionArr,
  Permission,
  sendPerData,
} from '@/api/acl/menu/type'
import { reactive } from 'vue'
import { onMounted, ref } from 'vue'

const dlgShow = ref<boolean>(false)
const perArr = ref<PermissionArr>([])
// 获取数据
onMounted(() => getPer())
const getPer = async () => {
  let res: PerResData = await reqAllPermisstion()
  if (res.code == 200) {
    perArr.value = res.data
  }
}

// 收集表单数据
const perParams = reactive<sendPerData>({
  code: '',
  name: '',
  level: 0,
  pid: 0,
})
// 添加
const addPer = (row: Permission) => {
  Object.assign(perParams, { code: '', name: '', level: 0, pid: 0 })
  dlgShow.value = !dlgShow.value
  // 给点击菜单的子菜单加
  perParams.level = row.level + 1

  //给谁添加子菜单
  perParams.pid = row.id as number
}
// 更新
const updatePer = (row: Permission) => {
  Object.assign(perParams, row)
  dlgShow.value = !dlgShow.value
}
// 删除
const deletePer = async (row: Permission) => {
  let res = await reqRemovePer(row.id as number)
  if (res.code == 200) {
    ElMessage.success('删除成功')
    getPer()
  } else {
    ElMessage.error('删除失败')
  }
}

// 点击确定发送数据
const sendPer = async () => {
  let res: any = await reqAddOrUpdatePer(perParams)
  if (res.code == 200) {
    ElMessage.success(perParams.id ? '更新成功' : '添加成功')
    dlgShow.value = !dlgShow.value
    getPer()
  } else {
    ElMessage.error(perParams.id ? '更新失败' : '添加失败')
  }
}
</script>

<style scoped lang="scss"></style>
