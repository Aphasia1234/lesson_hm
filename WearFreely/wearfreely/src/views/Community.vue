<template>
    <div id="Community">
        <el-input 
            v-model="searchText"
            placeholder="请输入搜索内容"
            class="search-input"
            clearable
        >
            <template #prefix>
                <el-icon><search /></el-icon>
            </template>
        </el-input>
        <div><RotainMap/></div>
        <div><textcommunity/></div>
        <scrolltotop/>
    </div>
</template>

<script setup>
import RotainMap from '@/components/Community/RotainMap.vue'
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import textcommunity from '@/components/Community/TextCommunity.vue'
import scrolltotop from '@/components/ScrollToTop.vue'

const searchText = ref('')
</script>

<style scoped>
.search-input {
    width: 100%;
    margin-bottom: 10px;
    position: fixed;
    top: 20px;
    z-index: 100;
}

#Community{
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  z-index: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding-top: 60px;
  background-color: #FFDEE9;
  background-image: linear-gradient(90deg, #FFDEE9 0%, #B5FFFC 100%);
}
</style>