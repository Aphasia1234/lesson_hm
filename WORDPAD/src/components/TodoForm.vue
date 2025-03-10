<script setup>
import { ref } from 'vue';

const emit = defineEmits(['add-todo']);
const newTodo = ref('');

const addTodo = () => {
  emit('add-todo', newTodo.value);
  newTodo.value = ''; // 清空输入框
};

const handleKeyup = (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
};
</script>

<template>
  <div class="todo-form">
    <input 
      type="text" 
      v-model="newTodo" 
      placeholder="添加新的待办事项..." 
      @keyup="handleKeyup"
      class="todo-input"
    />
    <button @click="addTodo" class="add-btn">添加</button>
  </div>
</template>

<style scoped>
.todo-form {
  display: flex;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}

.todo-input:focus {
  border-color: #4caf50;
}

.add-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background-color: #45a049;
}
</style>