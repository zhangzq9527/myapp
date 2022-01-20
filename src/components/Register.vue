<template>
  <div>
    <el-form
      ref="registerFormRules"
      :model="registerForm"
      label-width="100px"
      class="registerForm"
      :rules="rules"
      @keyup.enter="submitRegister()"
    >
      <el-form-item label="账号:" prop="username">
        <el-input v-model="registerForm.username" :prefix-icon="Avatar"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="registerForm.password" type="password" :prefix-icon="Lock"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="checkpassword">
        <el-input v-model="registerForm.checkpassword" type="password" :prefix-icon="Lock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitRegister()" class="registerbtn">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Avatar, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const registerForm = reactive({
  username: '',
  password: '',
  checkpassword: ''
})
const registerFormRules = ref()
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
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
      validator: validatePass,
      trigger: 'blur'
    }
  ],
  checkpassword: [
    {
      required: true,
      validator: validatePass2,
      trigger: 'blur'
    }
  ]
})

const submitRegister = async () => {
  if (!registerFormRules.value) {
    return
  } else {
    try {
      if (await registerFormRules.value.validate()) {
        ElMessage({
          message: '注册成功',
          type: 'success',
          showClose: true,
          center: true
        })
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
<style lang="scss" scoped>
.registerForm {
  width: 350px;
  position: relative;
  margin: 0 auto;
  margin-top: 20px;
}
.registerbtn {
  margin-left: 90px;
}
</style>
