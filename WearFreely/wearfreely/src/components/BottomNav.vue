<!-- 使用v-for循环渲染navItems数组中的每个导航项。
 每个导航项包含一个动态组件(显示图标)和文字说明，
 通过activePath判断当前活动项并添加active类名，
 点击时会触发navigateTo方法进行路由跳转。 -->
<template>
    <div class="bottom-nav">
      <div 
        v-for="item in navItems" 
        :key="item.path"
        class="nav-item"
        :class="{ 'active': activePath === item.path }"
        @click="navigateTo(item.path)"
      >
        <component :is="item.icon" class="nav-icon" />
        <span class="nav-text">{{ item.name }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  // 导入需要的图标（按需引入）
  import { House, View,ShoppingCart, User } from '@element-plus/icons-vue'
  
  const router = useRouter()
  const route = useRoute()
  const activePath = ref(route.path)
  
  // 导航项配置
  const navItems = [
    { path: '/home', name: '首页', icon: House },
    { path: '/community', name: '社区', icon: View },
    { path: '/shopping', name:'商城',icon:ShoppingCart},
    { path: '/personpage', name: '我的', icon: User },
  ]
  
  // 监听路由变化
  watch(() => route.path, (newPath) => {
    activePath.value = newPath
  })
  
  // 跳转路由
  const navigateTo = (path) => {
    router.push(path)
  }
  </script>
  
  <style scoped>
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 60px;
    background-color: #FFDEE9;
background-image: linear-gradient(90deg, #FFDEE9 0%, #B5FFFC 100%);
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
  
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #666;
    cursor: pointer;
  }
  
  .nav-item.active {
    color: #409eff;
  }
  
  .nav-icon {
    width: 24px;
    height: 24px;
  }
  
  .nav-text {
    font-size: 12px;
    margin-top: 4px;
  }
  </style>