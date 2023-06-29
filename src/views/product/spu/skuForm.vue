<template>
  <el-card>
    <el-form size="normal" label-width="100px">
      <el-form-item label="SKU名称 :">
        <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元) :">
        <el-input placeholder="价格(元) " v-model="skuParams.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(g) :">
        <el-input placeholder="重量(g) " v-model="skuParams.weight"></el-input>
      </el-form-item>
      <el-form-item label="SKU描述 :">
        <el-input
          placeholder="SKU描述 "
          type="textarea"
          v-model="skuParams.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性 :">
        <el-form :inline="true" label-width="150">
          <el-form-item
            v-for="item in attrArr"
            :key="item.id"
            :label="item.attrName"
            style="margin: 5px 0"
          >
            <el-select v-model="item.attrIdandValue">
              <el-option
                v-for="i in item.attrValueList"
                :key="i.id"
                :label="i.valueName"
                :value="`${item.id}:${i.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性 :">
        <el-form :inline="true" label-width="150">
          <el-form-item
            v-for="item in sealArr"
            :key="item.id"
            :label="item.saleAttrName"
            style="margin: 5px 0"
          >
            <el-select v-model="item.saleIdAndValue">
              <el-option
                v-for="i in item.spuSaleAttrValueList"
                :key="i.id"
                :label="i.saleAttrValueName"
                :value="`${item.id}:${i.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片名称 :">
        <el-table border stripe :data="imageArr" ref="reftable">
          <el-table-column
            type="selection"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column align="center" label="图片">
            <template #="{ row }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="名称"
            prop="imgName"
          ></el-table-column>
          <el-table-column align="center" label="操作">
            <template #="{ row }">
              <el-button type="primary" size="small" @click="handImg(row)">
                设为默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="saveHand">
          保存
        </el-button>
        <el-button type="primary" size="default" @click="handCancel">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { getAttrInfo } from '@/api/product/attr'
import { Attr, AttrResponse } from '@/api/product/attr/type'
import {
  ReqSpuSaleAttr,
  ReqSpuImage,
  SpuImage,
  SpuSaleAttr,
  AddSkuData,
} from '@/api/product/spu/type'
import { reqAddSku, reqHasSaleAttr, reqImageList } from '@/api/product/spu'
import { SpuData } from '@/api/product/spu/type'
import { ref } from 'vue'
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

// 平台属性
const attrArr = ref<Attr[]>([])
// 销售属性
const sealArr = ref<SpuSaleAttr[]>([])
// 图片数据
const imageArr = ref<SpuImage[]>([])

const reftable = ref<any>()

// 收集sku数据
const skuParams = reactive<AddSkuData>({
  category3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuDefaultImg: '',
  skuAttrValueList: [
    {
      attrId: '',
      valueId: '',
    },
  ],
  skuSaleAttrValueList: [
    {
      saleAttrId: '',
      saleAttrValueld: '',
    },
  ],
})

const emit = defineEmits(['handChangeCurrent'])
const handCancel = () => {
  emit('handChangeCurrent', 0)
}
// 对外暴露一个请求数据的方法
const getData = async (
  c1id: number | string,
  c2id: number | string,
  row: SpuData,
) => {
  // 获取平台属性
  skuParams.category3Id = row.category3Id
  skuParams.spuId = row.id as number
  skuParams.tmId = row.tmId
  let res1: AttrResponse = await getAttrInfo(c1id, c2id, row.category3Id)

  // 获取对应销售属性
  let res2: ReqSpuSaleAttr = await reqHasSaleAttr(row.id as number)

  // 获取照片
  let res3: ReqSpuImage = await reqImageList(row.id as number)
  attrArr.value = res1.data
  sealArr.value = res2.data
  imageArr.value = res3.data
}

const handImg = (row: any) => {
  imageArr.value.forEach((item: any) =>
    reftable.value.toggleRowSelection(item, false),
  )
  reftable.value.toggleRowSelection(row, true)
  skuParams.skuDefaultImg = row.imgUrl
}

const saveHand = async () => {
  // 整理参数
  // 平台属性
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdandValue) {
      let [attrId, valueId] = next.attrIdandValue.split(':')
      prev.push({ attrId, valueId })
    }
    return prev
  }, [])

  // 销售属性
  skuParams.skuSaleAttrValueList = sealArr.value.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndValue) {
        let [saleAttrId, saleAttrValueId] = next.saleIdAndValue.split(':')
        prev.push({ saleAttrId, saleAttrValueId })
      }
      return prev
    },
    [],
  )

  // 发请求
  let res = await reqAddSku(skuParams)
  console.log(res)

  // 成功
  if (res.code == 200) {
    ElMessage.success('修改成功')
    emit('handChangeCurrent', 0)
  } else {
    ElMessage.error('修改失败')
  }
  // 失败
}

defineExpose({ getData })
</script>

<style scoped lang="scss"></style>
