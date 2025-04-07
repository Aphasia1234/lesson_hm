import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000, // 10秒超时
});

export const askQuestion = async (question) => {
  try {
    const response = await api.post('/ask', { question });
    return response.data.answer;
  } catch (error) {
    console.error('API Error:', error);
    throw error.response?.data?.error || '获取回答失败，请稍后重试';
  }
};