<template>
  <div id="Logining">
    <form @submit.prevent="login" class="formlogin">
      <div>
        <h2><img src="@/assets/login/denglu.svg" alt="登录"></h2>
        <img src="@/assets/login/yonghuming.svg" alt="用户名">
        <SelfInput type="text" v-model="username" required placeholder="请输入用户名"/>
      </div>
      <div>
        <img src="@/assets/login/mima.svg" alt="密码">
        <SelfInput type="password" v-model="password" required placeholder="请输入密码"/>
      </div>
      <SelfButton type="submit">登 录</SelfButton>
      <SelfButton @click="goToRegister">去注册</SelfButton>
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
const err = ref('');

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/login', {
      username: username.value,
      password: password.value
    });
    localStorage.setItem('token', response.data.token);
    router.push('/home');
  } catch (error) {
    err.value='用户名或密码错误'
  }
};
const cheakerr = () => {
  err.value=false;
}
const goToRegister = () => {
  router.push('/register');
};
</script>

<style scoped> 
#Logining{
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
.formlogin{
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
