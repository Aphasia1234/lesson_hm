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
  background-color: #FA8BFF;
  background-image: linear-gradient(225deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%);
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 0px;
  padding-bottom: 80px; /* 为底部导航留出空间 */
}
</style>
