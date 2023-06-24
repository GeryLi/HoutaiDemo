<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1ID"
          @change="handChange1"
          :disabled="!isShow"
        >
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.c2ID"
          @change="handChange2"
          :disabled="!isShow"
        >
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :label="c2.name"
            :key="c2.id"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3ID" :disabled="!isShow">
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :label="c3.name"
            :key="c3.id"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { useCategoryStore } from '@/store/module/CategoryStore'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()
defineProps(['isShow'])

onMounted(() => {
  categoryStore.getC1()
})

const handChange1 = () => {
  // 先清空二三的数据
  categoryStore.c2ID = ''
  categoryStore.c3ID = ''
  categoryStore.getC2()
}
const handChange2 = () => {
  categoryStore.c3ID = ''

  categoryStore.getC3()
}
</script>

<style scoped lang="scss"></style>
