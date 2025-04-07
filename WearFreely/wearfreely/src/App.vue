<template>
  <div>
    <router-view></router-view>
    <BottomNav/>
  </div>
</template>

<script setup>
import BottomNav from '@/components/BottomNav.vue'
</script>

<style scoped>
body {
  padding-bottom: 60px; /* 根据导航栏高度调整 */
  overflow: hidden;
}
</style>