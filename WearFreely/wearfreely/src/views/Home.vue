<template>
 <div id="HOME">
  <div class="leftbox">

    <div class="yifu">
    <img src="@/assets/home/yifu.svg" alt="衣服" class="icon">
    <div class="yifumask"></div>
    </div>
    <ColorSelect @changeColor="updateColor1"/>

    <div class="kuzi">
    <img src="@/assets/home/kuzi.svg" alt="裤子" class="icon">
    <div class="kuzimask"></div>
    </div>
    <ColorSelect @changeColor="updateColor2"/>

    <div class="xiezi">
    <img src="@/assets/home/xiezi.svg" alt="鞋子" class="icon">
    <div class="xiezimask"></div>
    </div>
    <ColorSelect @changeColor="updateColor3"/>

  </div>

  <span><img :src="Me" class="small">自我评分：<Star/></span>

  <div class="AItest">
   <!-- <img :src="bot" class="iconbot"> -->
   <img :src="bot" class="small">
   <SelfButton @click="TestRating">A I 测评</SelfButton>
   
   <div v-if="error" class="error-message">
        <img src="@/assets/home/jinggao.svg" alt="">
        {{ error }}
      </div>
      <div v-if="answer" class="answer-section">
        <h3>回答：</h3>
        <p>{{ answer }}</p>
      </div>
  </div>
  <ColorQuestion/>
 </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Me from '@/assets/home/Me.svg'
import bot from '@/assets/home/bot.svg'
import ColorSelect from '@/components/Home/ColorSelect.vue'
import Star from '@/components/Home/Star.vue'
import SelfButton from '@/components/SelfButton.vue'
import ColorQuestion from '@/components/Home/ColorQuestion.vue'


// 颜色选择器1
const color1 = ref('') 
function updateColor1(color) {
  color1.value = color;
  const element = document.querySelector('.yifumask');
  element.style.setProperty('--mask-bg-color', color1.value);
}
// 颜色选择器2
const color2 = ref('')
function updateColor2(color) {
  color2.value = color;
  const element = document.querySelector('.kuzimask');
  element.style.setProperty('--mask-bg-color', color2.value);
}
// 颜色选择器3
const color3 = ref('')
function updateColor3(color) {
  color3.value = color;
  const element = document.querySelector('.xiezimask');
  element.style.setProperty('--mask-bg-color', color3.value);
}

const answer = ref('')
const error = ref(null);
async function TestRating(){
  try {
    const question = color1.value + color2.value + color3.value + '这三个颜色搭配在一起怎么样呢？';
    if(color1.value == '' || color2.value == '' || color3.value == ''){
      error.value = '请选择三个颜色';
      setTimeout(() => {
        error.value = null;
      }, 3000);
      return;
    }
    console.log(question);
    const response = await axios.post('http://localhost:3000/api/ask', {
      question: question
    });
    console.log('API响应:', response.data);
    // 在这里处理返回的数据
    answer.value = response.data.answer;
  } catch (error) {
    // 在这里处理错误
    error.value = '请求出错';
  }
}

</script>

<style scoped>
#HOME {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 0;
  overflow: auto;
  
}

#HOME::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('@/assets/home/bgcimg.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.7;
  z-index: -1;
}
.leftbox{
  width:100%;
  height:60%;
  display: inline;
}
.icon {
  width: 100px;
  height: 100px;
  display: inline;
}
.AItest{
  display: inline;
}
.small{
  width:40px;
}
.answer-section{
  background-color: #fff;
  opacity: 0.6;
  }
  .error-message{
    font-size: 20px;
    border-radius: 10px;
    border:black solid 2px;
    padding: 5px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: yellow;
  }
  .yifu{
    position: relative;
    width: 100px;
    height: 100px;
  }
  .yifumask{
    position: absolute;
    inset:0; /* 四个方向都为0,铺满整个元素 */
    /* background: url('@/assets/home/yifumask.svg') no-repeat center / cover;  */
    background: var(--mask-bg-color,white); /* 使用变量，默认值为原颜色 */
    mask: url('@/assets/home/yifumask.svg') no-repeat center / cover;
    mix-blend-mode: multiply; /*颜色混合 */
  }
  .kuzi{
    position: relative;
    width: 100px;
    height: 100px;
  }
  .kuzimask{
    position: absolute;
    inset:0; /* 四个方向都为0,铺满整个元素 */
    background: var(--mask-bg-color,white); /* 使用变量，默认值为原颜色 */
    mask: url('@/assets/home/kuzimask.svg') no-repeat center / cover;
    mix-blend-mode: multiply; /*颜色混合 */
  }
  .xiezi{
    position: relative;
    width: 100px;
    height: 100px;
  }
  .xiezimask{
    position: absolute;
    inset:0; /* 四个方向都为0,铺满整个元素 */
    background: var(--mask-bg-color,white); /* 使用变量，默认值为原颜色 */
    mask: url('@/assets/home/xiezimask.svg') no-repeat center / cover;
    mix-blend-mode: multiply; /*颜色混合 */
  }
</style>