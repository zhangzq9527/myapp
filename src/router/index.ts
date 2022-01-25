import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../components/Login.vue'
import index from '../components/index.vue'
import Register from '../components/Register.vue'
import { ElMessage } from 'element-plus'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/Index',
    name: 'Index',
    component: index,
    meta: {
      title: '首页',
      requireAuth: true
    }
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register,
    meta: {
      title: '注册'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  /* 页面title */
  if (to.meta.title) {
    document.title = <string>to.meta.title
  }
  /* 判断该路由是否需要登录权限 */
  if (to.matched.some(record => record.meta.requireAuth)) {
    const EXPIRESTIME = 60000
    console.log(sessionStorage.getItem('vuex'))
    let token: any = sessionStorage.getItem('vuex')
    token = JSON.parse(token)
    console.log(token)
    if (token) {
      const date = new Date().getTime()
      // 如果大于就是过期了，如果小于或等于就还没过期
      if (date - Number(token.Login.user.startTime) > EXPIRESTIME) {
        sessionStorage.removeItem('vuex')
        ElMessage({
          message: '登录已过期，请重新登录',
          type: 'warning',
          showClose: true,
          center: true
        })
        next({
          path: '/'
        })
      }
    } else {
      ElMessage({
        message: '用户未登录',
        type: 'warning',
        showClose: true,
        center: true
      })
      next({
        path: '/'
      })
    }
  }
  next()
})

export default router
