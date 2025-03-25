<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import TodoItem from './TodoItem.vue';
import TodoForm from './TodoForm.vue';
import TodoFilter from './TodoFilter.vue';

// 定义待办事项数据结构
const todos = ref([]);
const filter = ref('all'); // 筛选条件：all, active, completed
const searchText = ref('');

// 从localStorage加载数据
onMounted(() => {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos);
  }
});

// 监听todos变化，保存到localStorage
watch(todos, (newTodos) => {
  localStorage.setItem('todos', JSON.stringify(newTodos));
}, { deep: true });

// 添加新待办事项
const addTodo = (text) => {
  if (text.trim()) {
    todos.value.push({
      id: Date.now(),
      text,
      completed: false,
      category: 'default',
      createdAt: new Date().toISOString()
    });
  }
};

// 删除待办事项
const removeTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id);
};

// 切换待办事项完成状态
const toggleTodo = (id) => {
  const todo = todos.value.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};

// 更新待办事项分类
const updateCategory = (id, category) => {
  const todo = todos.value.find(todo => todo.id === id);
  if (todo) {
    todo.category = category;
  }
};

// 计算属性：筛选后的待办事项
const filteredTodos = computed(() => {
  let result = todos.value;
  
  // 根据完成状态筛选
  if (filter.value === 'active') {
    result = result.filter(todo => !todo.completed);
  } else if (filter.value === 'completed') {
    result = result.filter(todo => todo.completed);
  }
  
  // 根据搜索文本筛选
  if (searchText.value) {
    const searchLower = searchText.value.toLowerCase();
    result = result.filter(todo => 
      todo.text.toLowerCase().includes(searchLower) ||
      todo.category.toLowerCase().includes(searchLower)
    );
  }
  
  return result;
});

// 统计信息
const stats = computed(() => {
  const total = todos.value.length;
  const completed = todos.value.filter(todo => todo.completed).length;
  const active = total - completed;
  return { total, completed, active };
});

// 更改筛选条件
const setFilter = (newFilter) => {
  filter.value = newFilter;
};

// 设置搜索文本
const setSearchText = (text) => {
  searchText.value = text;
};

// 拖拽排序处理
const handleDragStart = (event, index) => {
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', index);
};

const handleDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

const handleDrop = (event, toIndex) => {
  event.preventDefault();
  const fromIndex = event.dataTransfer.getData('text/plain');
  if (fromIndex !== toIndex) {
    const item = todos.value.splice(fromIndex, 1)[0];
    todos.value.splice(toIndex, 0, item);
  }
};
</script>

<template>
  <div class="todo-container">
    <h1>记事本</h1>
    
    <TodoForm @add-todo="addTodo" />
    
    <TodoFilter 
      :stats="stats" 
      :current-filter="filter" 
      @set-filter="setFilter" 
      @set-search="setSearchText"
    />
    
    <div class="todo-list" @dragover="handleDragOver">
      <p v-if="filteredTodos.length === 0" class="empty-message">
        没有符合条件的待办事项
      </p>
      <TodoItem 
        v-for="(todo, index) in filteredTodos" 
        :key="todo.id"
        :todo="todo"
        :index="index"
        @remove="removeTodo(todo.id)"
        @toggle="toggleTodo(todo.id)"
        @update-category="updateCategory(todo.id, $event)"
        @dragstart="handleDragStart($event, index)"
        @drop="handleDrop($event, index)"
      />
    </div>
  </div>
</template>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #FFDEE9;
  background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.todo-list {
  margin-top: 20px;
}

.empty-message {
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 20px 0;
}
</style>