import { getAttrInfo, reqC1, reqC2, reqC3 } from '@/api/product/attr'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AttrResponse, CatGoryResData } from '@/api/product/attr/type'
export const useCategoryStore = defineStore('CategoryStore', () => {
  const c1ID = ref('')
  const c2ID = ref('')
  const c3ID = ref('')
  const c1Arr = ref()
  const c2Arr = ref()
  const c3Arr = ref()
  const arrInfo = ref()
  const getC1 = async () => {
    let res: CatGoryResData = await reqC1()

    if (res.code == 200) {
      c1Arr.value = res.data
    }
  }
  const getC2 = async () => {
    let res: CatGoryResData = await reqC2(c1ID.value)

    if (res.code == 200) {
      c2Arr.value = res.data
    }
  }

  const getC3 = async () => {
    let res: CatGoryResData = await reqC3(c2ID.value)

    if (res.code == 200) {
      c3Arr.value = res.data
    }
  }
  const getAttr = async () => {
    let res: AttrResponse = await getAttrInfo(
      c1ID.value,
      c2ID.value,
      c3ID.value,
    )

    if (res.code == 200) {
      arrInfo.value = res.data
    }
  }

  return {
    c1ID,
    c2ID,
    c3ID,
    c1Arr,
    c2Arr,
    c3Arr,
    arrInfo,
    getC1,
    getC2,
    getC3,
    getAttr,
  }
})
