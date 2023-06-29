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
          v-model:file-list="allImage"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img
            w-full
            :src="dialogImageUrl"
            alt="Preview Image"
            style="width: 100%"
          />
        </el-dialog>
      </el-form-item>

      <el-form-item label="SPU销售属性 :" label-width="120">
        <el-select
          :placeholder="`还有${unSlelctArr.length}种选择`"
          v-model="selectAttrIdAndvaluename"
        >
          <el-option
            v-for="item in unSlelctArr"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}:${item.name}`"
          ></el-option>
        </el-select>

        <el-button
          type="primary"
          size="default"
          @click="addSaleAttr"
          :disabled="!selectAttrIdAndvaluename"
          icon="plus"
          style="margin-left: 10px"
        >
          添加销售属性
        </el-button>

        <el-table width="100%" border stripe :data="reqSpuSaleAttr">
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
            prop="saleAttrName"
          ></el-table-column>
          <el-table-column label="属性值" align="center">
            <template #="{ row, $index }">
              <el-tag
                v-for="item in row.spuSaleAttrValueList"
                :key="row.id"
                closable
                style="margin: 0 5px"
                @close="row.spuSaleAttrValueList.splice($index, 1)"
              >
                {{ item.saleAttrValueName }}
              </el-tag>

              <el-input
                size="small"
                clearable
                @blur="toLook(row)"
                style="width: 100px"
                v-if="row.flag"
                v-model="row.saleAttrValue"
              ></el-input>
              <el-button
                @click="handClick(row)"
                type="primary"
                size="small"
                icon="plus"
                v-else
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120px">
            <template #="{ $index }">
              <el-button
                type="primary"
                size="small"
                icon="delete"
                @click="reqSpuSaleAttr.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 10px">
          <el-button type="primary" size="default" @click="handSave">
            保存
          </el-button>
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
  reqAddOrUpdateSpu,
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
  SpuSaleAttrValueList,
} from '@/api/product/spu/type'
import { computed } from 'vue'
import { ElMessage } from 'element-plus'

import { ref } from 'vue'

const emit = defineEmits(['handChangeCurrent'])

const allTradMark = ref<TradMark[]>([])
const allImage = ref<SpuImage[]>([])
const reqSpuSaleAttr = ref<SpuSaleAttr[]>([])
const allSpuSaleAttr = ref<AllSaleAttrData[]>([])

const dialogVisible = ref<boolean>(false)
const dialogImageUrl = ref<string>('')

// 手机未拥有的属性
const selectAttrIdAndvaluename = ref<string>('')

const SpuParams = ref<SpuData>({
  spuName: '',
  description: '',
  category3Id: '',
  tmId: '',
  spuSaleAttrList: [],
  spuImageList: [],
})
const handCancel = () => {
  emit('handChangeCurrent', 0)
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
  allImage.value = res2.data.map((i) => ({
    name: i.imgName,
    url: i.imgUrl,
  }))
  reqSpuSaleAttr.value = res3.data
  allSpuSaleAttr.value = res4.data
}

// handlePictureCardPreview 点击照片墙预览的回调
const handlePictureCardPreview = (file: any) => {
  dialogVisible.value = true
  dialogImageUrl.value = file.url
}

// 照片墙删除时候的钩子
const handleRemove = () => {}

// 计算当前spu未拥有的属性
const unSlelctArr = computed(() => {
  let unSelect = allSpuSaleAttr.value.filter((item) => {
    return reqSpuSaleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelect
})

// addSaleAttr 添加销售属性的方法
const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] =
    selectAttrIdAndvaluename.value.split(':')
  let newSaleAttr: SpuSaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  reqSpuSaleAttr.value.push(newSaleAttr)
  selectAttrIdAndvaluename.value = ''
}

//handClick 点击tag 后按钮显示input
const handClick = (row: SpuSaleAttr) => {
  row.flag = true
  row.saleAttrValue = ''
}
// toLook 推出tag编辑模式后
const toLook = (row: SpuSaleAttr) => {
  row.flag = false
  const { baseSaleAttrId, saleAttrValue } = row
  let newSaleAttr: SpuSaleAttrValueList = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }
  // 判断不能为空
  if (saleAttrValue?.trim() == '') {
    ElMessage.error('属性值不能为空')
    return
  }
  let repeat = row.spuSaleAttrValueList.find(
    (item) => item.saleAttrValueName == saleAttrValue,
  )
  if (repeat) {
    ElMessage.error('属性值不能重复')
    return
  }

  row.spuSaleAttrValueList.push(newSaleAttr)
}

// 保存 发送请求
const handSave = async () => {
  // 整理数据
  SpuParams.value.spuImageList = allImage.value.map((i: any) => ({
    imgName: i.name,
    imgUrl: (i.response && i.response.data) || i.url,
  }))
  SpuParams.value.spuSaleAttrList = reqSpuSaleAttr.value

  let res = await reqAddOrUpdateSpu(SpuParams.value)

  if (res.code == 200) {
    ElMessage.success(SpuParams.value.id ? '更新成功' : '添加成功')
    emit('handChangeCurrent', 0)
  } else {
    ElMessage.error(SpuParams.value.id ? '更新失败' : '添加失败')
  }
}

// 点击addspu按钮 发送亲求
const addSpu = async (c3ID: string) => {
  // 每次点击先清空数据
  Object.assign(SpuParams.value, {
    spuName: '',
    description: '',
    category3Id: '',
    tmId: '',
    spuSaleAttrList: [],
    spuImageList: [],
  })
  allImage.value = []
  reqSpuSaleAttr.value = []
  selectAttrIdAndvaluename.value = ''

  // 获取所有品牌数据
  SpuParams.value.category3Id = c3ID
  let res1: AllTradMark = await reqAllTradMark()
  let res2: AllSaleAttr = await reqAllSaleAttr()

  allTradMark.value = res1.data
  allSpuSaleAttr.value = res2.data
}

defineExpose({ initData, addSpu })
</script>

<style scoped lang="scss"></style>
