<template>
    <div id="PersonPage">
      <div class="persondata">
        <Touxiang class="touxiang"/>
        <p class="username" @click="toggleEdit">{{ username }}</p>
        <p class="signature" @click="toggleEdit">{{ signature }}</p>
       
      </div>
      <div class="mywork">
        <SelfButton><img src="@/assets/personimg/chuangzuo.svg" alt="我的创作"></SelfButton>
        <SelfButton><img src="@/assets/personimg/dianzan.svg" alt="我的点赞"></SelfButton>
        <SelfButton><img src="@/assets/personimg/shoucang.svg" alt="我的收藏"></SelfButton>
      </div>
      <br/>
       <div class="photoimg">
        <photh/>
       </div>
        <strong class="text">更多内容还在开发中……</strong>
      
      <div class="editmassage" v-if="isEditing">
        <h2>信息编辑</h2>
        <span>用户名：</span><SelfInput class="username-input" 
        v-model="editingUsername" 
        :isEditing="isEditing" 
        /><br/>
        <span>个性签名：</span><SelfInput class="signature-input" 
        v-model="editingSignature" 
        :isEditing="isEditing" 
        />
        <SelfButton @click="cancle">取消</SelfButton>
        <SelfButton @click="ensure">确定</SelfButton>
      </div>
      
      <div class="bgc">
      </div>


      <div>
        <button @click="handleLogout" class="dengchu"><img src="@/assets/personimg/dengchu.svg" alt="退出登录"></button>
      </div>
      
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Touxiang from '@/components/Personpage/Touxiang.vue';
import { ref } from 'vue';
const router = useRouter();
import SelfInput from '@/components/SelfInput.vue';
import SelfButton from '@/components/SelfButton.vue';
import photh from '@/components/Personpage/photo.vue'

const username = ref('用户12138');
const signature = ref('这家伙很懒，什么都没有留下');
const isEditing = ref(false);
const editingUsername = ref('');
const editingSignature = ref('');

const toggleEdit = () => {
  isEditing.value = true;
};

const cancle = () => {
  isEditing.value = false;
};
const ensure = () => {
  isEditing.value = false;
  username.value = editingUsername.value;
  signature.value = editingSignature.value;
};

const handleLogout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
</script>

<style scoped>
#PersonPage{
 height: 100%;
 width: 100%;
}
#PersonPage::before{
 content: '';
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 background-image: url('@/assets/personimg/Personal.jpg');
 background-size: cover;
 background-position: center;
 background-repeat: no-repeat;
 z-index: -2;
}
.dengchu{
  position:fixed;
  top:0;
  right:0;
}
.touxiang{
  position:fixed;
  top:200px;
  left:20px;
  margin:0;
  z-index:1;
}
.username{
  font-family: "黑体";
  position:fixed;
  top:300px;
  left:170px;
  font-size: 2em;
  background-color: #FFDEE9;
  background-image: linear-gradient(90deg, #FFDEE9 0%, #B5FFFC 100%);
  opacity: 0.8;
  margin: 0;
  padding: 0;
  border: 2px white solid;
  border-radius: 20px;
}
.signature{
  font-family: "黑体";
  position:fixed;
  top:350px;
  left:20px;
  font-size: 1.5em;
  background-color: #FFDEE9;
  background-image: linear-gradient(90deg, #FFDEE9 0%, #B5FFFC 100%);
  opacity: 0.8;
  margin: 0;
  padding: 0;
  border: 2px white solid;
  border-radius: 5px;
}
.editmassage{
  /*视口居中*/
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFDEE9;
  background-image: linear-gradient(90deg, #FFDEE9 0%, #B5FFFC 100%);
  padding: 60px;
  z-index: 999;
}
.username-input{
  text-align: center;
  display: inline-block;
}
.persondata{
  z-index:1;
  width:400px;
  height:400px;
  display: flex;
  margin: 0;
  padding: 0;
}
.bgc{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height:70%;
  background-color: #FFDEE9;
  background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);
  z-index: -1;
  opacity: 0.7;
}
.mywork{
  display:flex;
  border:gray 2px solid;
  gap:70px;
  box-shadow: gray 5px 5px 10px;
  margin-left: auto;
  margin-right: auto;
  width: 70%; /* 需要指定宽度 */
}
.text{
  font-size: 20px;
  font-family: "黑体";
  position: fixed;
  bottom: 90px;
  left:25%;
  color: gray;
}
.photoimg{
  display:flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  
}
</style>