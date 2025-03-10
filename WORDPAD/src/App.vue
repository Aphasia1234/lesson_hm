<script setup>
import BottomNav from './components/BottomNav.vue';
</script>

<template>
  <div class="app">
    <router-view />
    <BottomNav />
  </div>
</template>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  padding-bottom: 80px; /* 为底部导航留出空间 */
}
</style>
