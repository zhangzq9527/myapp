<template>
  <div>
    <p>账号：{{ username }}</p>
    <p>密码：{{ password }}</p>
    <el-button type="primary" @click="quitLogin()">退出</el-button>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "../store/index";

const store = useStore();
const username = computed(() => store.state.Login.username);
const password = computed(() => store.state.Login.password);
const quitLogin = () => {
  store.commit("loginOut");
};
</script>
