import { createApp } from 'vue'
import App from './App.vue'
// import store from './store'
// 通常我们会直接在 main.ts 中创建并使用 Pinia，而不是单独导出
import { createPinia } from 'pinia'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // 引入样式

// 创建 Pinia 实例
const store = createPinia()
// 创建vue实例
const app = createApp(App)
//挂载pinia
app
.use(store)
//挂载路由
.use(router)
// 挂载element-plus
.use(ElementPlus)
//挂载app实例
.mount('#app')
