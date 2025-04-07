// 评分五颗星
<template>
    <div class="demo-rate-block">
      <el-rate v-model="value" :colors="colors" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const value = ref(0)
  const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']) // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
  </script>
  
  <style scoped>
  .demo-rate-block {
    padding: 0px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    display: inline-block;
    width: 40%;
    box-sizing: border-box;
  }
  .demo-rate-block:last-child {
    border-right: none;
  }
  .demo-rate-block .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
  }
  </style>