<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  todo: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['remove', 'toggle', 'update-category', 'dragstart', 'drop']);

// 可用的分类列表
const categories = [
  { id: 'default', name: '默认' },
  { id: 'work', name: '工作' },
  { id: 'personal', name: '个人' },
  { id: 'shopping', name: '购物' },
  { id: 'other', name: '其他' }
];

// 处理拖拽事件
const handleDragStart = (event) => {
  emit('dragstart', event);
};

const handleDragOver = (event) => {
  event.preventDefault();
};

const handleDrop = (event) => {
  emit('drop', event);
};
</script>

<template>
  <div 
    class="todo-item" 
    :class="{ 'completed': todo.completed }"
    draggable="true"
    @dragstart="handleDragStart"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <div class="todo-content">
      <input 
        type="checkbox" 
        :checked="todo.completed" 
        @change="emit('toggle')"
        class="todo-checkbox"
      />
      
      <div class="todo-text-container">
        <p class="todo-text">{{ todo.text }}</p>
        <div class="todo-meta">
          <span class="todo-date">{{ new Date(todo.createdAt).toLocaleString() }}</span>
          <select 
            class="todo-category" 
            :value="todo.category"
            @change="emit('update-category', $event.target.value)"
          >
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    
    <button @click="emit('remove')" class="delete-btn">
      删除
    </button>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background-color: #f9f9f9;
  border-radius: 6px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  border-left: 4px solid #4caf50;
  cursor: grab;
}

.todo-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.todo-item.completed {
  border-left-color: #9e9e9e;
  opacity: 0.7;
}

.todo-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.todo-checkbox {
  margin-right: 12px;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.todo-text-container {
  flex: 1;
}

.todo-text {
  margin: 0 0 5px 0;
  font-size: 16px;
  word-break: break-word;
}

.completed .todo-text {
  text-decoration: line-through;
  color: #757575;
}

.todo-meta {
  display: flex;
  font-size: 12px;
  color: #757575;
  align-items: center;
}

.todo-date {
  margin-right: 10px;
}

.todo-category {
  padding: 2px 5px;
  border-radius: 3px;
  border: 1px solid #ddd;
  font-size: 12px;
  background-color: white;
}

.delete-btn {
  background-color: #ff5252;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #ff1744;
}
</style>