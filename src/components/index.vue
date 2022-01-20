<template>
  <div>
    <p>账号：{{ username }}</p>
    <p>密码：{{ password }}</p>
    <el-button type="primary" @click="quitLogin()">退出</el-button>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus/lib/components'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store/index'

const store = useStore()
const router = useRouter()
const username = computed(() => store.state.Login.username)
const password = computed(() => store.state.Login.password)
const quitLogin = () => {
  store.commit('loginOut')
  router.push('/')
  ElMessage({
    message: '已退出登录',
    type: 'success',
    showClose: true,
    center: true
  })
}
</script>
