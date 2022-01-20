<template>
  <div>
    <el-form
      ref="loginFormRules"
      :model="loginForm"
      label-width="80px"
      class="loginForm"
      :rules="rules"
      @keyup.enter="submitLogin()"
    >
      <el-form-item label="账号:" prop="username">
        <el-input v-model="loginForm.username" :prefix-icon="Avatar"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="loginForm.password" type="password" :prefix-icon="Lock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitLogin()" class="loginbtn">登录</el-button>
        <router-link to="/Register" style="text-decoration: none">
          <el-button type="primary">注册</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Avatar, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useStore } from '../store/index'

const store = useStore()
const router = useRouter()
const loginForm = reactive({
  username: '',
  password: ''
})
const loginFormRules = ref()
const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
})

const submitLogin = async () => {
  if (!loginFormRules.value) {
    return
  } else {
    try {
      if (await loginFormRules.value.validate()) {
        if (loginForm.username !== '' && loginForm.password !== '') {
          ElMessage({
            message: '登录成功',
            type: 'success',
            showClose: true,
            center: true
          })
          const paramss = {
            name: 'token',
            username: loginForm.username,
            password: loginForm.password,
            startTime: new Date().getTime()
          }
          store.commit('login', paramss)
          localStorage.setItem('token', JSON.stringify(paramss))
          console.log(paramss)
          router.push('/Index')
        } else {
          ElMessage({
            message: '账号或密码错误',
            type: 'error',
            showClose: true,
            center: true
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style lang="scss" scoped>
.loginForm {
  width: 350px;
  position: relative;
  margin: 0 auto;
  margin-top: 20px;
}

.loginbtn {
  margin-left: 50px;
  margin-right: 40px;
}
</style>
