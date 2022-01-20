import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../components/Login.vue";
import Index from "../components/Index.vue";
import Register from "../components/Register.vue";
import { ElMessage } from "element-plus";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      title: "登录",
    },
  },
  {
    path: "/Index",
    name: "Index",
    component: Index,
    meta: {
      title: "首页",
      requireAuth: true,
    },
  },
  {
    path: "/Register",
    name: "Register",
    component: Register,
    meta: {
      title: "注册",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  /* 页面title */
  if (to.meta.title) {
    const title: any = to.meta.title;
    document.title = title;
  }
  /* 判断该路由是否需要登录权限 */
  if (to.matched.some((record) => record.meta.requireAuth)) {
    const EXPIRESTIME = 600000;
    let token: any = localStorage.getItem("token");
    token = JSON.parse(token);
    if (token) {
      const date = new Date().getTime();
      // 如果大于就是过期了，如果小于或等于就还没过期
      if (date - Number(token.startTime) > EXPIRESTIME) {
        localStorage.removeItem("token");
        ElMessage({
          message: "登录已过期，请重新登录",
          type: "warning",
          showClose: true,
          center: true,
        });
        next({
          path: "/",
        });
      }
    } else {
      ElMessage({
        message: "用户未登录",
        type: "warning",
        showClose: true,
        center: true,
      });
      next({
        path: "/",
      });
    }
  }
  next();
});

export default router;
