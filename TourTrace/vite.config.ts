import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 预先加载 UI 组件库
import Components from 'unplugin-vue-components/vite'
// 引入 vant 组件 编译阶段 自动引入 快
import { VantResolver } from '@vant/auto-import-resolver'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        VantResolver()
      ]
    })
  ],
})
