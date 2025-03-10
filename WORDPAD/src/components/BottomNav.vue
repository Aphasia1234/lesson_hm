<template>
  <nav class="bottom-nav">
    <router-link to="/" class="nav-item">
      <i class="nav-icon home-icon"></i>
      <span>首页</span>
    </router-link>
    <router-link to="/calendar" class="nav-item">
      <i class="nav-icon calendar-icon"></i>
      <span>日历</span>
    </router-link>
    <router-link to="/profile" class="nav-item">
      <i class="nav-icon profile-icon"></i>
      <span>我的</span>
    </router-link>
  </nav>
</template>

<script setup>
// 底部导航组件逻辑
</script>

<style scoped>
.bottom-nav {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  height: 60px;
  z-index: 100;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  text-decoration: none;
  font-size: 12px;
  transition: color 0.3s;
}

.nav-item.router-link-active {
  color: #646cff;
}

.nav-icon {
  display: block;
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.home-icon {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>');
}

.calendar-icon {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>');
}

.profile-icon {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>');
}
</style>