import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Community from "@/views/Community.vue";
import Shopping from "@/views/Shopping.vue";
import Personpage from "@/views/Personpage.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      component: Home,
      meta: { title: '首页' } // 可选：设置页面标题
    },
    {
      path: '/community',
      component: Community,
      meta: { title: '社区' }
    },
    {
      path: '/shopping',
      component: Shopping,
      meta: { title: '购物' }
    },
    {
      path: '/product/:id',
      component: ProductDetail,
      meta: { title: '商品详情' }
    },
    {
      path: '/personpage',
      component: Personpage,
      meta: {
        requiresAuth: true, // 需要登录
        title: '个人中心'
      }
    },
    {
      path: '/',
      redirect: '/login' // 默认重定向到登录
    },
    {
      path: '/login',
      component: Login,
      meta: { title: '登录' }
    },
    {
      path: '/register',
      component: Register,
      meta: { title: '注册' }
    }
  ]
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // 检查是否登录
  // 如果目标路由需要登录但未登录，跳转到登录页
  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log('未登录');
    next('/login');
  } 
  // 如果已登录但访问的是登录页，跳转到首页（避免重复登录）
  else if (to.path === '/login' && isAuthenticated) {
    next('/home');
  } 
  // 否则正常放行
  else {
    next();
  }

  // 可选：动态设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});

export default router;