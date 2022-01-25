<template>
  <div id="nav" @mousemove="handleTime">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { timeOptions } from './config/Config'
import { useRouter } from 'vue-router'

const router = useRouter()
let lastTime = new Date().getTime()
let currentTime: number
const token = sessionStorage.getItem('vuex')
const handleTime = () => {
  currentTime = new Date().getTime()
  if (token) {
    if (currentTime - lastTime > Number(timeOptions.timeOut)) {
      lastTime = new Date().getTime()
      ElMessage({
        message: '长时间未操作，登陆已过期',
        type: 'warning',
        showClose: true,
        center: true
      })
      localStorage.removeItem('vuex')
      router.push('/')
    } else {
      lastTime = new Date().getTime()
    }
  }
}
</script>

<style lang="scss"></style>
