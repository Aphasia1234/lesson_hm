<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  stats: {
    type: Object,
    required: true
  },
  currentFilter: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['set-filter', 'set-search']);
const searchInput = ref('');

const setFilter = (filter) => {
  emit('set-filter', filter);
};

const handleSearch = () => {
  emit('set-search', searchInput.value);
};

const clearSearch = () => {
  searchInput.value = '';
  emit('set-search', '');
};
</script>

<template>
  <div class="filter-container">
    <div class="filter-buttons">
      <button 
        @click="setFilter('all')"
        :class="{ active: currentFilter === 'all' }"
        class="filter-btn"
      >
        全部 ({{ stats.total }})
      </button>
      <button 
        @click="setFilter('active')"
        :class="{ active: currentFilter === 'active' }"
        class="filter-btn"
      >
        未完成 ({{ stats.active }})
      </button>
      <button 
        @click="setFilter('completed')"
        :class="{ active: currentFilter === 'completed' }"
        class="filter-btn"
      >
        已完成 ({{ stats.completed }})
      </button>
    </div>
    
    <div class="search-container">
      <input 
        type="text" 
        v-model="searchInput" 
        placeholder="搜索待办事项..." 
        class="search-input"
        @keyup.enter="handleSearch"
      />
      <button @click="handleSearch" class="search-btn">搜索</button>
      <button v-if="searchInput" @click="clearSearch" class="clear-btn">清除</button>
    </div>
  </div>
</template>

<style scoped>
.filter-container {
  margin-bottom: 20px;
}

.filter-buttons {
  display: flex;
  margin-bottom: 10px;
}

.filter-btn {
  background-color: #f1f1f1;
  border: none;
  padding: 8px 12px;
  margin-right: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.filter-btn:hover {
  background-color: #e0e0e0;
}

.filter-btn.active {
  background-color: #4caf50;
  color: white;
}

.search-container {
  display: flex;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 14px;
  outline: none;
}

.search-btn {
  background-color: #2196F3;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 14px;
}

.clear-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  margin-left: 8px;
  cursor: pointer;
  font-size: 14px;
}
</style>