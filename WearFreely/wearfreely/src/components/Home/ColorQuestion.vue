<template>
    <div class="course-qa">
      <form @submit.prevent="handleSubmit">
        <label for="question">输入你的问题：</label>
        <div class="form-group">
          <SelfInput
            id="question"
            v-model.trim="question"
            type="text"
            placeholder="例如：同学聚会怎么搭配？"
            :disabled="isLoading"
          />
          <SelfButton  type="submit" :disabled="isLoading || !question.trim()">
          {{ isLoading ? '提交中...' : '提交问题' }}
        </SelfButton>
        </div>
      </form>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <div v-if="answer" class="answer-section">
        <h3>回答：</h3>
        <p>{{ answer }}</p>
        <div class="kong">

        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { askQuestion } from '@/services/colorAPI';
  import SelfButton from '@/components/SelfButton.vue';
  import SelfInput from '@/components/SelfInput.vue';


  const question = ref('');
  const answer = ref('');
  const isLoading = ref(false);
  const error = ref(null);
  
  const handleSubmit = async () => {
    if (!question.value.trim()) {
      error.value = '请输入问题';
      return;
    }
  
    isLoading.value = true;
    error.value = null;
    answer.value = '';
    
    try {
      answer.value = await askQuestion(question.value);
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .answer-section{
    background-color: #fff;
    opacity: 0.6;
    
  }
  .error-message{
    background-color: #fff;
    opacity: 0.6;
  }
  .kong{
    height: 60px;
  }
  </style>