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
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="delete"
              title="删除SPU"
            ></el-button>
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
import { reqHasSpu } from '@/api/product/spu/index'
import { HasSpuResponseData, Records, SpuData } from '@/api/product/spu/type'
import skuForm from './skuForm.vue'
import spuForm from './spuForm.vue'
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
</script>

<style scoped lang="scss"></style>
