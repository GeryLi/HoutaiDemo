<template>
  <div class="login_box">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="formRef"
        >
          <h1>Hello</h1>
          <h2>后台管理系统</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              :show-password="true"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="login_btn"
              @click="loginHandle"
              :loading="loadingShow"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/module/userStore'
import { useRouter } from 'vue-router'
import { getTime } from '@/utils/time'
//@ts-ignore
import { ElNotification } from 'element-plus'
// 导入路由
const router = useRouter()

// 绑定登录loading的ref对象
let loadingShow = ref(false)

// 定义双向绑定的formdata
const loginForm = reactive({
  username: 'admin',
  password: '111111',
})

// 获取用户小仓库
let userStore = useUserStore()

// 获取表单校验成功后的回电
let formRef = ref()

// 登录回调
const loginHandle = async () => {
  // 保证所有表单校验通过
  await formRef.value.validate()

  // 设置加载的为真
  loadingShow.value = true

  try {
    // 登陆成功
    await userStore.userLogin(loginForm)
    router.push('/')
    ElNotification({
      type: 'success',
      message: `${loginForm.username},欢迎回来！`,
      title: `HI,${getTime()}好~`,
    })
  } catch (error) {
    // 登陆成功
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  } finally {
    // 是否登陆成功 加载效果都关闭
    loadingShow.value = false
  }
}

// 表单校验规则
const rules = {
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, message: '账号长度最少三位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度最少六位', trigger: 'blur' },
  ],
}
</script>

<style scoped lang="scss">
.login_box {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    padding: 40px;
    width: 60%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;

    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      color: white;
      font-size: 25px;
      margin: 20px 0;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
