<template>
  <div class="profile-container">
    <div class="header-container">
      <h1>主页</h1>
    </div>
    
    <!-- 未登录状态显示登录注册表单 -->
    <div v-if="!isLoggedIn" class="auth-container">
      <div class="tabs">
        <button 
          :class="{ 'active': activeTab === 'login' }" 
          @click="activeTab = 'login'"
        >
          登录
        </button>
        <button 
          :class="{ 'active': activeTab === 'register' }" 
          @click="activeTab = 'register'"
        >
          注册
        </button>
      </div>
      
      <!-- 登录表单 -->
      <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="loginUsername">用户名</label>
          <input 
            type="text" 
            id="loginUsername" 
            v-model="loginForm.username" 
            required
            placeholder="请输入用户名"
          >
        </div>
        
        <div class="form-group">
          <label for="loginPassword">密码</label>
          <input 
            type="password" 
            id="loginPassword" 
            v-model="loginForm.password" 
            required
            placeholder="请输入密码"
          >
        </div>
        
        <div v-if="loginError" class="error-message">
          {{ loginError }}
        </div>
        
        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
      </form>
      
      <!-- 注册表单 -->
      <form v-if="activeTab === 'register'" @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label for="registerUsername">用户名</label>
          <input 
            type="text" 
            id="registerUsername" 
            v-model="registerForm.username" 
            required
            placeholder="请输入用户名"
          >
        </div>
        
        <div class="form-group">
          <label for="registerPassword">密码</label>
          <input 
            type="password" 
            id="registerPassword" 
            v-model="registerForm.password" 
            required
            placeholder="请输入密码"
          >
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">确认密码</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="registerForm.confirmPassword" 
            required
            placeholder="请再次输入密码"
          >
        </div>
        
        <div v-if="registerError" class="error-message">
          {{ registerError }}
        </div>
        
        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? '注册中...' : '注册' }}
        </button>
      </form>
    </div>
    
    <!-- 已登录状态显示用户信息 -->
    <div v-else class="user-info">
      <h2>欢迎回来，{{ userInfo.nickname || userInfo.username }}</h2>
      
      <div class="avatar-container">
        <img :src="userInfo.avatar" alt="用户头像" class="avatar" />
        <div class="avatar-upload" v-if="isEditing">
          <input type="file" id="avatar-input" @change="handleAvatarChange" accept="image/*" class="avatar-input" />
          <label for="avatar-input" class="avatar-label">更换头像</label>
        </div>
      </div>
      
      <div class="info-card" v-if="!isEditing">
        <div class="info-item">
          <span class="label">用户名:</span>
          <span class="value">{{ userInfo.username }}</span>
        </div>
        <div class="info-item">
          <span class="label">昵称:</span>
          <span class="value">{{ userInfo.nickname || userInfo.username }}</span>
        </div>
        <div class="info-item">
          <span class="label">个性签名:</span>
          <span class="value">{{ userInfo.bio || '这个人很懒，什么都没留下' }}</span>
        </div>
        <div class="info-item">
          <span class="label">账号创建时间:</span>
          <span class="value">{{ formatDate(userInfo.createdAt) }}</span>
        </div>
      </div>
      
      <!-- 编辑表单 -->
      <div class="edit-form" v-if="isEditing">
        <div class="form-group">
          <label for="nickname">昵称</label>
          <input 
            type="text" 
            id="nickname" 
            v-model="editForm.nickname" 
            placeholder="请输入昵称"
          >
        </div>
        
        <div class="form-group">
          <label for="bio">个性签名</label>
          <textarea 
            id="bio" 
            v-model="editForm.bio" 
            placeholder="请输入个性签名"
            rows="3"
          ></textarea>
        </div>
      </div>
      
      <div class="button-group">
        <template v-if="!isEditing">
          <button @click="startEditing" class="edit-btn">
            编辑资料
          </button>
        </template>
        <template v-else>
          <button @click="saveUserInfo" class="save-btn">
            保存
          </button>
          <button @click="cancelEditing" class="cancel-btn">
            取消
          </button>
        </template>
      </div>
      
      <!-- 底部退出登录按钮 -->
      <div class="logout-container">
        <button @click="handleLogout" class="logout-btn">
          退出登录
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 表单状态
const activeTab = ref('login');
const isLoading = ref(false);
const loginError = ref('');
const registerError = ref('');
const isEditing = ref(false);

// 编辑表单
const editForm = reactive({
  nickname: '',
  bio: ''
});

// 头像预览
const avatarPreview = ref('');

// 登录表单
const loginForm = reactive({
  username: '',
  password: ''
});

// 注册表单
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: ''
});

// 用户信息
const userInfo = reactive({
  username: '',
  createdAt: null,
  avatar: '',
  nickname: '',
  bio: ''
});

// 默认头像
const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';

// 登录状态
const token = ref(localStorage.getItem('token') || '');
const isLoggedIn = computed(() => !!token.value);

// 在组件挂载时检查登录状态并获取用户信息
onMounted(() => {
  if (isLoggedIn.value) {
    getUserInfo();
  }
});

// 处理登录
async function handleLogin() {
  if (!loginForm.username || !loginForm.password) {
    loginError.value = '请填写完整的登录信息';
    return;
  }
  
  try {
    isLoading.value = true;
    loginError.value = '';
    
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 这里应该是实际的API调用
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     username: loginForm.username,
    //     password: loginForm.password
    //   })
    // });
    // const data = await response.json();
    
    // 模拟成功响应
    const data = {
      success: true,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNjE2MTUxNjE2fQ.example-token',
      user: {
        username: loginForm.username,
        createdAt: new Date().toISOString()
      }
    };
    
    if (data.success) {
      // 保存token到localStorage
      localStorage.setItem('token', data.token);
      token.value = data.token;
      
      // 更新用户信息
      userInfo.username = data.user.username;
      userInfo.createdAt = data.user.createdAt;
      userInfo.avatar = defaultAvatar; // 设置默认头像
      userInfo.nickname = data.user.username; // 默认昵称与用户名相同
      userInfo.bio = ''; // 默认空个性签名
      
      // 保存用户信息到localStorage
      localStorage.setItem('userInfo', JSON.stringify({
        username: userInfo.username,
        createdAt: userInfo.createdAt,
        avatar: userInfo.avatar,
        nickname: userInfo.nickname,
        bio: userInfo.bio
      }));
      
      // 重置表单
      loginForm.username = '';
      loginForm.password = '';
    } else {
      loginError.value = data.message || '登录失败，请检查用户名和密码';
    }
  } catch (error) {
    console.error('登录出错:', error);
    loginError.value = '登录过程中发生错误，请稍后再试';
  } finally {
    isLoading.value = false;
  }
}

// 处理注册
async function handleRegister() {
  if (!registerForm.username || !registerForm.password || !registerForm.confirmPassword) {
    registerError.value = '请填写完整的注册信息';
    return;
  }
  
  if (registerForm.password !== registerForm.confirmPassword) {
    registerError.value = '两次输入的密码不一致';
    return;
  }
  
  try {
    isLoading.value = true;
    registerError.value = '';
    
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 这里应该是实际的API调用
    // const response = await fetch('/api/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     username: registerForm.username,
    //     password: registerForm.password
    //   })
    // });
    // const data = await response.json();
    
    // 模拟成功响应
    const data = {
      success: true,
      message: '注册成功'
    };
    
    if (data.success) {
      // 注册成功后切换到登录页
      activeTab.value = 'login';
      loginForm.username = registerForm.username;
      
      // 重置注册表单
      registerForm.username = '';
      registerForm.password = '';
      registerForm.confirmPassword = '';
      
      // 显示成功消息
      alert('注册成功，请登录');
    } else {
      registerError.value = data.message || '注册失败，请稍后再试';
    }
  } catch (error) {
    console.error('注册出错:', error);
    registerError.value = '注册过程中发生错误，请稍后再试';
  } finally {
    isLoading.value = false;
  }
}

// 获取用户信息
async function getUserInfo() {
  try {
    // 实际项目中应该调用API获取用户信息
    // const response = await fetch('/api/user', {
    //   headers: {
    //     'Authorization': `Bearer ${token.value}`
    //   }
    // });
    // const data = await response.json();
    
    // 从localStorage获取用户信息
    const savedUserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    
    // 模拟用户数据
    const data = {
      success: true,
      user: {
        username: savedUserInfo.username || '测试用户',
        createdAt: savedUserInfo.createdAt || new Date().toISOString(),
        avatar: savedUserInfo.avatar || defaultAvatar,
        nickname: savedUserInfo.nickname || '',
        bio: savedUserInfo.bio || ''
      }
    };
    
    if (data.success) {
      userInfo.username = data.user.username;
      userInfo.createdAt = data.user.createdAt;
      userInfo.avatar = data.user.avatar;
      userInfo.nickname = data.user.nickname || data.user.username;
      userInfo.bio = data.user.bio;
    }
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }
}

// 处理登出
function handleLogout() {
  // 清除token
  localStorage.removeItem('token');
  token.value = '';
  
  // 重置用户信息
  userInfo.username = '';
  userInfo.createdAt = null;
  userInfo.avatar = '';
  userInfo.nickname = '';
  userInfo.bio = '';
  
  // 可选：跳转到首页
  // router.push('/');
}

// 格式化日期
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// 开始编辑用户信息
function startEditing() {
  editForm.nickname = userInfo.nickname || userInfo.username;
  editForm.bio = userInfo.bio || '';
  avatarPreview.value = userInfo.avatar;
  isEditing.value = true;
}

// 取消编辑
function cancelEditing() {
  isEditing.value = false;
}

// 保存用户信息
function saveUserInfo() {
  // 更新用户信息
  userInfo.nickname = editForm.nickname;
  userInfo.bio = editForm.bio;
  
  if (avatarPreview.value && avatarPreview.value !== userInfo.avatar) {
    userInfo.avatar = avatarPreview.value;
  }
  
  // 保存到localStorage
  localStorage.setItem('userInfo', JSON.stringify({
    username: userInfo.username,
    createdAt: userInfo.createdAt,
    avatar: userInfo.avatar,
    nickname: userInfo.nickname,
    bio: userInfo.bio
  }));
  
  // 退出编辑模式
  isEditing.value = false;
}

// 处理头像上传
function handleAvatarChange(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  // 检查文件类型
  if (!file.type.startsWith('image/')) {
    alert('请上传图片文件');
    return;
  }
  
  // 文件大小限制（2MB）
  if (file.size > 2 * 1024 * 1024) {
    alert('图片大小不能超过2MB');
    return;
  }
  
  // 读取文件并预览
  const reader = new FileReader();
  reader.onload = (e) => {
    avatarPreview.value = e.target.result;
  };
  reader.readAsDataURL(file);

}
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
}

.header-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 30px;
}

h1 {
  text-align: center;
  color: #333;
  margin: 0;
}

.auth-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #eee;
}

.tabs button {
  flex: 1;
  padding: 15px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.tabs button.active {
  background-color: #f8f8f8;
  font-weight: bold;
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
}

.auth-form {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.error-message {
  color: #ff4d4f;
  margin-bottom: 15px;
  font-size: 14px;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #40a9ff;
}

.submit-btn:disabled {
  background-color: #d9d9d9;
  cursor: not-allowed;
}

.user-info {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.user-info h2 {
  margin-bottom: 20px;
  color: #1890ff;
}

.info-card {
  background-color: #f8f8f8;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 10px;
  display: flex;
}

.info-item .label {
  font-weight: bold;
  width: 120px;
  color: #666;
}

.info-item .value {
  flex: 1;
}

.logout-container {
  margin-top: 20px;
  text-align: center;
}

.logout-btn {
  width: 100%;
  padding: 10px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #ff7875;
}

.avatar-container {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.avatar-upload {
  margin-top: 10px;
}

.avatar-input {
  display: none;
}

.avatar-label {
  display: inline-block;
  padding: 5px 10px;
  background-color: #1890ff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.avatar-label:hover {
  background-color: #40a9ff;
}

.edit-form {
  margin-bottom: 20px;
}

.edit-form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
}

.button-group {
  display: flex;
  gap: 10px;
}

.edit-btn, .save-btn {
  flex: 1;
  padding: 10px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-btn:hover, .save-btn:hover {
  background-color: #40a9ff;
}

.cancel-btn {
  flex: 1;
  padding: 10px;
  background-color: #d9d9d9;
  color: #333;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancel-btn:hover {
  background-color: #c4c4c4;
}
</style>