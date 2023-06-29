<template>
  <el-card class="box-card">
    <!-- 卡片顶部的按钮 -->
    <el-button
      type="primary"
      size="default"
      icon="plus"
      v-has="`btn.Trademark.add`"
      @click="addTradMark"
    >
      添加品牌
    </el-button>
    <!-- 表格组件 -->
    <el-table style="margin: 10px 0" border :data="trademarkArr">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column
        label="品牌名称"
        prop="tmName"
        align="center"
      ></el-table-column>
      <el-table-column label="品牌logo" align="center">
        <template #="{ row }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作" align="center">
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="edit"
            @click="updateTradMark(row)"
          ></el-button>
          <el-popconfirm
            :title="`是否确定删除${row.tmName}吗?`"
            width="200"
            icon="delete"
            @confirm="removeTradMark(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <!-- 
      v-model:current-page 分页器当前页码
      v-model:page-size   设置每页显示条目
      page-sizes    设置下拉菜单的数据条数
      small  是否使用小型分页器
      background  分页器背景颜色
      layout 设置分页器子组件的布局   -> 将后边的组件顶到后边
      :disabled 禁用
     -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      layout="prev, pager, next, jumper, ->,sizes,total"
      :total="total"
      @size-change="changeSize"
      @current-change="getHasTrademark"
      :background="true"
    />
  </el-card>

  <!-- 弹出框 -->
  <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
    <el-form
      style="width: 80%"
      :model="tradMarkData"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="品牌名称" label-width="80px" prop="tmName">
        <el-input v-model="tradMarkData.tmName" />
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="80px" prop="logoUrl">
        <!-- 
           action 上传图片的文档
         -->
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="tradMarkData.logoUrl"
            :src="tradMarkData.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-button type="primary" @click="agree">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  reqHasTrademark,
  reqAddTrademark,
  delTrademark,
} from '@/api/product/trademark'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

import type {
  Records,
  TradeMake,
  tradeMakeResponseData,
} from '@/api/product/trademark/type'

import type { UploadProps } from 'element-plus'
import { reactive } from 'vue'
// 当前页码
let currentPage = ref<number>(1)

// 设置每页显示条目
let pageSize = ref<number>(3)
let total = ref<number>(0)
// 获取组件实例
const formRef = ref()

// 存储已有品牌的数组
const trademarkArr = ref<Records>([])

// 封装请求数据接口
const getHasTrademark = async (pager = 1) => {
  currentPage.value = pager
  let res: tradeMakeResponseData = await reqHasTrademark(
    currentPage.value,
    pageSize.value,
  )
  if (res.code == 200) {
    total.value = res.data.total
    trademarkArr.value = res.data.records
  }
}
// 组件加载先请求数据
onMounted(() => {
  getHasTrademark()
})

// changeCurrent 改变页码时候回调

// 通过数据双向绑定   pageSize.value = size
// const changeCurrent = () => {
//   getHasTrademark()
// }

const changeSize = () => {
  getHasTrademark()
}

// dialogFormVisible 显示dialog
const dialogFormVisible = ref(false)

const dialogTitle = ref('')

// 定义收集品牌的数据
let tradMarkData = reactive<TradeMake>({
  // 清空数据
  tmName: '',
  logoUrl: '',
})

// upload 上传文件的约束
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  if (
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/jpg' ||
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 2) {
      return true
    } else {
      ElMessage.error('文件大小不能大于 2MB!')
      return false
    }
  } else {
    ElMessage.error('文件格式必须是jpeg png或gif')
    return false
  }
}

// 文件上传的成功的回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (response: any) => {
  tradMarkData.logoUrl = response.data
  //图片上传成功 清楚form校验提示信息
  formRef.value.clearValidate()
}

// 添加品牌按钮回调
const addTradMark = () => {
  dialogTitle.value = '添加品牌'
  tradMarkData.logoUrl = ''
  tradMarkData.tmName = ''
  dialogFormVisible.value = true
  formRef.value?.clearValidate(['tmName', 'logoUrl'])
}

//修改品牌按钮回调
const updateTradMark = async (row: TradeMake) => {
  dialogTitle.value = '修改信息'
  dialogFormVisible.value = true
  tradMarkData.id = row.id
  tradMarkData.logoUrl = row.logoUrl
  tradMarkData.tmName = row.tmName
}
// dlog取消
const cancel = () => {
  dialogFormVisible.value = false
}
// dlog确认
const agree = async () => {
  //  点击按钮校验规则对象
  // 只有校验通过 返回true 后边的才执行

  await formRef.value.validate()

  let res = await reqAddTrademark(tradMarkData)

  if (res.code == 200) {
    ElMessage.success('上传成功！')
    getHasTrademark()

    dialogFormVisible.value = false
  } else {
    ElMessage.error('上传失败！')
  }
}

// 自定义校验规则的方法
const validatorTmname = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称大于等于两位!'))
  }
}

const validatorLogoUrl = (_rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('请上传图片!'))
  }
}
// dlog 表单规则校验对象
const rules = {
  tmName: [
    // required 必填  trigger 触发规则的方式  validator 校验规则的方式
    { required: true, trigger: 'blur', validator: validatorTmname },
  ],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
}

// 确认删除的回调
const removeTradMark = async (id: number) => {
  let res: any = await delTrademark(id)
  if (res.code == 200) {
    ElMessage.success('删除成功!')
    getHasTrademark(
      trademarkArr.value.length > 1 ? currentPage.value : currentPage.value - 1,
    )
  } else {
    ElMessage.error('删除失败!')
  }
}
</script>

<style scoped lang="scss"></style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
