import pinia from '@/store'
import useUserStore from '@/store/module/userStore'

const userStore = useUserStore(pinia)
export const isHasButton = (app: any) => {
  app.directive('has', {
    mounted(el: any, options: any) {
      //自定义指令右侧的数值:如果在用户信息buttons数组当中没有
      //从DOM树上干掉
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el)
      }
    },
  })
}
