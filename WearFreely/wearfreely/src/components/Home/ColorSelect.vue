<!-- 颜色选择器 -->
<template>
    <div class="demo-color-block">
      <span>选择你的主颜色：</span>
      <el-color-picker v-model="color" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { defineEmits } from 'vue'
  import { watch } from 'vue'
  const color = ref('')
  // 组件通信 子->父
  const emit = defineEmits(['changeColor'])
  // 添加防抖函数
  const debounce = <T extends (...args: any[]) => any>(fn: T, delay = 500) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<typeof fn>) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };
  // 监听颜色变化并使用防抖
  watch(color, debounce((newValue: string) => {
    emit('changeColor', newValue)
  }))
  </script>
  
  <style>
  .demo-color-block {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  .demo-color-block .demonstration {
    margin-right: 16px;
  }

  </style>