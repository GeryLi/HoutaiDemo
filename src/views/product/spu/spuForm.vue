<template>
  <el-card style="margin: 10px 0">
    <el-form>
      <el-form-item label="SPU名称 :" label-width="120">
        <el-input style="width: 200px" v-model="SpuParams.spuName"></el-input>
      </el-form-item>

      <el-form-item label="SPU品牌 :" label-width="120">
        <el-select
          placeholder="请选择你的品牌"
          clearable
          filterable
          @change=""
          v-model="SpuParams.tmId"
        >
          <el-option
            v-for="item in allTradMark"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述 :" label-width="120">
        <el-input
          placeholder="请输入描述"
          size="normal"
          clearable
          @change=""
          type="textarea"
          style="width: 600px"
          v-model="SpuParams.description"
        ></el-input>
      </el-form-item>

      <el-form-item label="SPU照片 :" label-width="120">
        <el-upload
          v-model:file-list="fileList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="SPU销售属性 :" label-width="120">
        <el-select placeholder="还有三种选择">
          <el-option>111</el-option>
          <el-option>222</el-option>
          <el-option>222</el-option>
        </el-select>
        <el-button
          type="primary"
          size="default"
          @click=""
          :disabled="true"
          icon="plus"
          style="margin-left: 10px"
        >
          添加销售属性
        </el-button>

        <el-table width="100%" border stripe>
          <el-table-column
            width="80px"
            label="序号"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column
            label="属性名"
            align="center"
            width="120px"
          ></el-table-column>
          <el-table-column label="属性值" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="120px">
            <template #>
              <el-button type="primary" size="small" icon="delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 10px">
          <el-button type="primary" size="default" @click="">保存</el-button>
          <el-button type="primary" size="default" @click="handCancel">
            取消
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import {
  reqImageList,
  reqAllTradMark,
  reqAllSaleAttr,
  reqHasSaleAttr,
} from '@/api/product/spu'

import {
  AllTradMark,
  ReqSpuImage,
  SpuData,
  ReqSpuSaleAttr,
  SpuSaleAttr,
  AllSaleAttr,
  TradMark,
  SpuImage,
  AllSaleAttrData,
} from '@/api/product/spu/type'
import { ref } from 'vue'

const emit = defineEmits(['handChangeCurrent'])

const allTradMark = ref<TradMark[]>([])
const allImage = ref<SpuImage[]>([])
const reqSpuSaleAttr = ref<SpuSaleAttr[]>([])
const allSpuSaleAttr = ref<AllSaleAttrData[]>([])

const SpuParams = ref<SpuData>({
  spuName: '',
  description: '',
  category3Id: '',
  tmId: '',
  spuSaleAttrList: [],
  spuImageList: [],
})
const handCancel = () => {
  emit('handChangeCurrent')
}

// 发起请求的方法 对外暴露 让父组件触发传入id
const initData = async (spu: SpuData) => {
  SpuParams.value = spu
  // 去获取全部品牌的数据
  let res1: AllTradMark = await reqAllTradMark()
  // 获取全部图片
  let res2: ReqSpuImage = await reqImageList(spu.id as number)
  //  获取销售属性的数据
  let res3: ReqSpuSaleAttr = await reqHasSaleAttr(spu.id as number)
  // 获取全部spu销售属性
  let res4: AllSaleAttr = await reqAllSaleAttr()
  allTradMark.value = res1.data
  allImage.value = res2.data
  reqSpuSaleAttr.value = res3.data
  allSpuSaleAttr.value = res4.data
}

defineExpose({ initData })
</script>

<style scoped lang="scss"></style>
