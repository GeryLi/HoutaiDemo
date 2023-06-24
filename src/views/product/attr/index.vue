<template>
  <!-- 顶部区域 -->
  <Category :isShow="isShow" />

  <!-- 底部区域 -->
  <el-card style="margin: 10px 0">
    <!--设置常规区域 -->
    <template v-if="isShow">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="CategoryStore.c3ID ? false : true"
        @click="isShow = false"
      >
        添加平台属性
      </el-button>

      <el-table
        border
        width="100%"
        style="margin: 20px 0"
        :data="CategoryStore.arrInfo"
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          label="属性名称"
          width="120"
          align="center"
          prop="attrName"
        ></el-table-column>
        <el-table-column label="属性值名称" align="center">
          <template #="{ row }">
            <el-tag
              v-for="item in row.attrValueList"
              :key="item.id"
              style="margin: 5px"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="edit"
              @click="handEdit(row)"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="delete"
              @click="handDelete(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 设置编辑区域 -->
    <template v-else>
      <el-form :inline="true" size="normal">
        <el-form-item label="属性名称">
          <el-input
            placeholder="请输入属性名称"
            v-model="attrParams.attrName"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="attrParams.attrName ? false : true"
        @click="addAttrValue"
      >
        添加属性值
      </el-button>
      <el-button type="primary" size="default" @click="handCancel">
        取消
      </el-button>
      <el-table
        border
        stripe
        style="margin: 10px 0"
        :data="attrParams.attrValueList"
      >
        <el-table-column
          width="80"
          type="index"
          align="center"
          label="序号"
        ></el-table-column>
        <el-table-column label="属性值名称" align="center">
          <template #="{ row, $index }">
            <el-input
              v-if="row.flag"
              placeholder="请输入属性值"
              v-model="row.valueName"
              @blur="blurFlag(row, $index)"
              :ref="(vc:any) => (inputArr[$index] = vc)"
            ></el-input>
            <div v-else @click="handDiv(row, $index)">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #="{ $index }">
            <el-button
              type="primary"
              size="small"
              icon="delete"
              @click="deleteArr($index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        size="default"
        @click="saveAttr"
        :disabled="!(attrParams.attrValueList.length > 0)"
      >
        保存
      </el-button>
      <el-button type="primary" size="default" @click="handCancel">
        取消
      </el-button>
    </template>
  </el-card>
</template>

<script lang="ts" setup>
import { reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr'
import { Attr, AttrValue } from '@/api/product/attr/type'
import { useCategoryStore } from '@/store/module/CategoryStore'
import { reactive, nextTick, ref, watch } from 'vue'

const CategoryStore = useCategoryStore()
// 设置一个显示添加修改面板的值
const isShow = ref<boolean>(true)
const inputArr = ref<any>([])

// 控制编辑模式的显示方式

// 监听c3的id 进行数据获取
watch(
  () => CategoryStore.c3ID,
  () => {
    CategoryStore.arrInfo = []
    // 改变一级分类后先判断c3的值 在进行网络请求
    if (CategoryStore.c3ID) CategoryStore.getAttr()
  },
)

// 收集新增属性
const attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '', // 三级分类的id
  categoryLevel: 3, // 修改到三级分类
})

// 点击编辑按钮
const handEdit = (row: Attr) => {
  // 先进入编辑菜单
  isShow.value = !isShow.value
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  // 设置表单元素为当前行的数据
}

// 删除
const handDelete = async (row: Attr) => {
  let res = await reqDeleteAttr(row.id as number)
  if (res.code == 200) {
    ElMessage.success('删除成功！')
    CategoryStore.getAttr()
  } else {
    ElMessage.success('删除失败！')
  }
}
// addAttrValue 点击添加后表单中添加数据
const addAttrValue = () => {
  // 收集参数 id参数

  attrParams.categoryId = CategoryStore.c3ID
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
  nextTick(() => inputArr.value[attrParams.attrValueList.length - 1].focus())
}
// 保存按钮
const saveAttr = async () => {
  if (attrParams.attrValueList.length > 0) {
    let res: any = await reqAddOrUpdateAttr(attrParams)
    if (res.code === 200) {
      ElMessage.success('成功')
    } else {
      ElMessage.success('失败')
    }
    handCancel()
    CategoryStore.getAttr()
  } else {
    ElMessage.error('数据不能为空')
  }
}

// 点击取消按钮
const handCancel = () => {
  attrParams.attrName = ''
  attrParams.attrValueList = []
  isShow.value = !isShow.value
}

const blurFlag = (row: AttrValue, $index: number) => {
  //  判断不能为空
  if (row.valueName.trim() == '') {
    attrParams.attrValueList.splice($index, 1)
    ElMessage.error('属性值不能为空')
    return
  }
  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  //  判断属性名是否重复
  if (repeat) {
    ElMessage.error('属性值不能重复')
    attrParams.attrValueList.splice($index, 1)

    return
  }

  row.flag = !row.flag
}
// 删除编辑模式中属性
const deleteArr = ($index: number) => {
  attrParams.attrValueList.splice($index, 1)
  ElMessage.success('删除成功')
}

//  点击div聚焦
const handDiv = (row: AttrValue, $index: number) => {
  row.flag = !row.flag

  nextTick(() => inputArr.value[$index].focus())
}
</script>

<style scoped lang="scss"></style>
