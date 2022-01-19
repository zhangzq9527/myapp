<template>
  <div id="nav" @mousemove="handleTime">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { timeOptions } from "./config/Config";
import { useRouter } from "vue-router";

const router = useRouter();
let lastTime = new Date().getTime();
let currentTime: number;
const handleTime = () => {
  currentTime = new Date().getTime();
  if (currentTime - lastTime > Number(timeOptions.timeOut)) {
    console.log(timeOptions.timeOut);
    lastTime = new Date().getTime();
    ElMessage({
      message: "长时间未操作，登陆已过期",
      type: "warning",
      showClose: true,
      center: true,
    });
    localStorage.removeItem("token");
    router.push("/");
  } else {
    lastTime = new Date().getTime();
  }
};
</script>

<style lang="scss"></style>
