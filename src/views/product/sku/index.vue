<template>
  <el-card shadow="always">
    <el-table border stripe style="margin-bottom: 10px" :data="skuArr">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>

      <el-table-column
        label="名称"
        width="150px"
        align="center"
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        align="center"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="默认图片" width="150px" align="center">
        <template #="{ row }">
          <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column
        label="重量(g)"
        width="150px"
        align="center"
        prop="weight"
      ></el-table-column>
      <el-table-column
        label="价格(元)"
        width="150px"
        align="center"
        prop="price"
      ></el-table-column>
      <el-table-column label="操作" width="250" align="center" fixed="right">
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            :icon="row.isSale ? 'Bottom' : 'Top'"
            @click="changeSale(row)"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="edit"
            @click="handleedit"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="InfoFilled"
            @click="seeSku(row)"
          ></el-button>
          <el-popconfirm
            :title="`确定要删除${row.skuName}吗？`"
            @confirm="handleDelete(row)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 15, 20]"
      layout="prev, pager, next, jumper, ->,sizes,total"
      :total="total"
      @size-change="sizeChange"
      @current-change="getSkuData"
      :background="true"
    />
  </el-card>

  <el-drawer v-model="drawer" title="查看商品详情" direction="rtl">
    <template #header></template>
    <template #default>
      <el-row style="margin: 10px 0">
        <el-col :span="5" :offset="0" align="right">名称 :</el-col>
        <el-col :span="18" :offset="1">{{ skuInfoArr.skuName }}</el-col>
      </el-row>
      <el-row style="margin: 10px 0">
        <el-col :span="5" :offset="0" align="right">描述 :</el-col>
        <el-col :span="18" :offset="1">{{ skuInfoArr.skuDesc }}</el-col>
      </el-row>
      <el-row style="margin: 10px 0">
        <el-col :span="5" :offset="0" align="right">价格 :</el-col>
        <el-col :span="18" :offset="1">{{ skuInfoArr.price }}</el-col>
      </el-row>
      <el-row style="margin: 10px 0">
        <el-col :span="5" :offset="0" align="right">平台属性 :</el-col>
        <el-col :span="18" :offset="1">
          <el-tag
            v-for="item in skuInfoArr.skuAttrValueList"
            :key="item.id"
            style="margin: 0 5px"
          >
            {{ item.attrName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row style="margin: 10px 0">
        <el-col :span="5" :offset="0" align="right">销售属性 :</el-col>
        <el-col :span="18" :offset="1">
          <el-tag
            v-for="item in skuInfoArr.skuSaleAttrValueList"
            :key="item.saleAttrId"
            style="margin: 0 5px"
          >
            {{ item.saleAttrName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row style="margin: 10px 0">
        <el-col :span="5" :offset="0" align="right">商品图片 :</el-col>
        <el-col :span="18" :offset="1">
          <!-- 轮播 -->
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item
              v-for="item in skuInfoArr.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" alt="" style="width: 100%" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'

import {
  reqCanCelSale,
  reqSale,
  reqSku,
  reqSkuInFo,
  reqDeleteSku,
} from '@/api/product/sku/idnex'
import type {
  SkuResData,
  AddSkuData,
  SkuResInfoData,
} from '@/api/product/sku/type'
import { onMounted } from 'vue'
import { ref } from 'vue'

const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(10)
const skuArr = ref<AddSkuData[]>([])
const skuInfoArr = ref<AddSkuData>({})

// 控制抽屉 显示英寸
const drawer = ref<boolean>(false)
// 定义获取数据的方法
const getSkuData = async (pages = 1) => {
  currentPage.value = pages
  let res: SkuResData = await reqSku(currentPage.value, pageSize.value)
  if (res.code == 200) {
    skuArr.value = res.data.records
    total.value = res.data.total
  } else {
    ElMessage.error('获取数据失败')
  }
}

// 改变 每页条目
const sizeChange = () => {
  getSkuData()
}

// 上下架商品
const changeSale = async (row: AddSkuData) => {
  // 下架

  if (row.isSale == 1) {
    let res: any = await reqCanCelSale(row.id as number)

    if (res.code == 200) {
      ElMessage.success('下架成功')
    }
  } else {
    // 上架

    let res: any = await reqSale(row.id as number)

    if (res.code == 200) {
      ElMessage.success('上架成功')
    }
  }
  getSkuData()
}

const handleedit = () => {
  ElMessage.success('正在努力开发~')
}

const seeSku = async (row: AddSkuData) => {
  drawer.value = !drawer.value
  let res: SkuResInfoData = await reqSkuInFo(row.id as number)
  if (res.code == 200) {
    skuInfoArr.value = res.data
  }
}

// 删除sku
const handleDelete = async (row: AddSkuData) => {
  let res: any = await reqDeleteSku(row.id as number)
  if (res.code == 200) {
    ElMessage.success('删除成功~')
    getSkuData(
      skuArr.value.length > 1 ? currentPage.value : currentPage.value - 1,
    )
  } else {
    ElMessage.error('删除失败:' + res.data)
  }
}
onMounted(() => {
  getSkuData()
})
</script>

<style scoped lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
