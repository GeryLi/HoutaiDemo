<template>
  <!-- 顶部 -->
  <Category :isShow="isShow"></Category>

  <!-- 中心区域部  -->
  <el-card style="margin: 10px 0">
    <div v-show="changeCurrent === 0">
      <el-button
        type="primary"
        size="default"
        icon="plus"
        :disabled="!CategoryStore.c3ID"
        @click="addSpu"
      >
        添加SPU
      </el-button>
      <el-table border width="100%" style="margin: 20px 0" :data="spuData">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          label="SPU名称"
          align="center"
          prop="spuName"
        ></el-table-column>
        <el-table-column
          label="SPU描述"
          align="center"
          prop="description"
          show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="SPU操作" align="center">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="plus"
              title="添加SKU"
              @click="addSku(row)"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="edit"
              title="修改SPU"
              @click="editSpu(row)"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="view"
              title="查看SKU列表"
              @click="handLookSku(row)"
            ></el-button>

            <el-popconfirm
              :title="`确定要删除${row.spuName}吗？`"
              @confirm="deleteSpu(row)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="delete"
                  title="删除SPU"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <spuForm
      v-show="changeCurrent === 1"
      @handChangeCurrent="sonHandCurrent"
      ref="refspuForm"
    />
    <skuForm
      v-show="changeCurrent === 2"
      @handChangeCurrent="sonHandCurrent"
      ref="refskuForm"
    />

    <!-- dlog 对话框 -->
    <el-dialog title="Sku列表" v-model="dlogIsShow" width="30%" @close="">
      <el-table :data="skuListArr" border stripe style="margin: 10px 0">
        <el-table-column
          label="SKU名字"
          prop="skuName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="SKU价格"
          prop="price"
          align="center"
        ></el-table-column>
        <el-table-column
          label="SKU重量"
          prop="weight"
          align="center"
        ></el-table-column>
        <el-table-column label="SKU图片" align="center">
          <template #="{ row }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      layout="prev, pager, next, jumper, ->,sizes,total"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
      :background="true"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { useCategoryStore } from '@/store/module/CategoryStore'
import { watch, ref } from 'vue'
import { reqHasSpu, reqSkuList, reqDeleteSpu } from '@/api/product/spu/index'
import { ElMessage } from 'element-plus'

import {
  AddSkuData,
  HasSpuResponseData,
  Records,
  SkuInfoDate,
  SpuData,
} from '@/api/product/spu/type'
import skuForm from './skuForm.vue'
import spuForm from './spuForm.vue'
import { onBeforeMount } from 'vue'
const CategoryStore = useCategoryStore()

const isShow = ref(true)
const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
const spuData = ref<Records>([])
const total = ref<number>()
const changeCurrent = ref<number>(0)
// 子组件的ref对象
const refspuForm = ref()
const refskuForm = ref()

// dlog 显示
const dlogIsShow = ref<boolean>(false)

// skuList
const skuListArr = ref<AddSkuData[]>()
// 定义获取数据的方法
const getSpuData = async () => {
  let res: HasSpuResponseData = await reqHasSpu(
    currentPage.value,
    pageSize.value,
    CategoryStore.c3ID,
  )
  if (res.code == 200) {
    spuData.value = res.data.records
    total.value = res.data.total
  }
}

// 分页器改变页码
const currentChange = () => {
  getSpuData()
}

// 分页器改变条数
const sizeChange = () => {
  currentPage.value = 1
  getSpuData()
}

// 监测c3id 请求数据
watch(
  () => CategoryStore.c3ID,
  () => {
    //  C3id改变请求数据
    if (CategoryStore.c3ID) getSpuData()
  },
)

// 添加spu
const addSpu = () => {
  changeCurrent.value = 1
  isShow.value = !isShow.value
  refspuForm.value.addSpu(CategoryStore.c3ID)
}
// 修改Spu
const editSpu = (row: SpuData) => {
  changeCurrent.value = 1
  refspuForm.value.initData(row)
  isShow.value = !isShow.value
}

// 子组件通知父组件修改属性
const sonHandCurrent = (id: number) => {
  isShow.value = !isShow.value
  changeCurrent.value = id
  getSpuData()
}

// 添加sku
const addSku = (row: SpuData) => {
  isShow.value = !isShow.value
  changeCurrent.value = 2
  refskuForm.value.getData(CategoryStore.c1ID, CategoryStore.c2ID, row)
}

//handLookSku 查看Sku
const handLookSku = async (row: SpuData) => {
  //  显示dlog
  let res: SkuInfoDate = await reqSkuList(row.id as number)
  if (res.code == 200) {
    dlogIsShow.value = true
    skuListArr.value = res.data
  }
}

//  删除spu
const deleteSpu = async (row: SpuData) => {
  let res = await reqDeleteSpu(row.id as number)
  if (res.code == 200) {
    ElMessage.success('删除成功')
    getSpuData()
  } else {
    ElMessage.error()
    ;('删除成功')
  }
}

// 组件销毁 清除数据
onBeforeMount(() => {
  CategoryStore.$reset()
})
</script>

<style scoped lang="scss"></style>
