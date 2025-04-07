<template>
  <div id="Register">
    
    <form @submit.prevent="register" class="formregister">
      <div>
        <h2><img src="@/assets/login/zhuce.svg" alt="登录"></h2>
        <img src="@/assets/login/yonghuming.svg" alt="用户名">
        <SelfInput type="text" v-model="username" required placeholder="请输入用户名"/>
      </div>
      <div>
        <img src="@/assets/login/mima.svg" alt="密码">
        <SelfInput type="password" v-model="password" required placeholder="请输入密码" />
      </div>
      <div>
        <img src="@/assets/login/mima.svg" alt="确认密码">
        <SelfInput type="password" v-model="confirmPassword" required placeholder="请确认密码"/>
      </div>
      <SelfButton type="submit">注 册</SelfButton>
      <SelfButton @click="goToLogin" class="gotologin">去登录</SelfButton>
    </form>
    <div v-if="err" class="error">
      <strong>{{ err }}</strong><br/>
      <SelfButton @click="cheakerr">确定</SelfButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import SelfButton from '@/components/SelfButton.vue';
import SelfInput from '@/components/SelfInput.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const err = ref('');

const register = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      err.value='两次输入的密码不一致';
      return;
    }
    const response = await axios.post('http://localhost:3000/api/register', {
      username: username.value,
      password: password.value
    });
    alert('注册成功');
    router.push('/login');
  } catch (error) {
    err.value='用户名已存在'
  }
};

const goToLogin = () => {
  router.push('/login');
};
const cheakerr = () => {
  err.value=false;
}
</script>

<style scoped> 
#Register{
 align-items: center;
 
 position: fixed;
 top: 0;
 left: 0;
 width: 100vw;
 height: 100vh;
 background-color: #FFDEE9;
 background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);
}
h2{
  text-align: center;
}
.formregister{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 80vh;
}
.error{
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  opacity: 0.8;
  border-radius: 20px;
  border: black 1px solid;
  padding:20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>