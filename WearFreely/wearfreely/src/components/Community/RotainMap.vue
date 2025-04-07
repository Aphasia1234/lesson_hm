<!-- 轮播图 -->
<template>
    <el-carousel :interval="5000" height="300px" type="card">
      <el-carousel-item v-for="(img,index) in images" :key="index">
        <img 
        :src="img.url" 
        :alt="img.alt" 
        class="carousel-image"
      />
    </el-carousel-item>
    </el-carousel>
  </template>
  
  <script setup>
import img1 from '@/assets/images/color1.jpg'
import img2 from '@/assets/images/color2.jpg'
import img3 from '@/assets/images/color3.jpg'
import img4 from '@/assets/images/color4.jpg'
import img5 from '@/assets/images/color5.jpg'
import img6 from '@/assets/images/color6.jpg'

const images = [
  { url: img1, alt: '图片1' },
  { url: img2, alt: '图片2' },
  { url: img3, alt: '图片3' },
  { url: img4, alt: '图片4' },
  { url: img5, alt: '图片5' },
  { url: img6, alt: '图片6' }
]
  </script>

<style scoped>
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 卡片式轮播样式 */
.el-carousel__item {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 指示器样式 */
:deep(.el-carousel__indicators) {
  bottom: 20px;
}

:deep(.el-carousel__button) {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
  </style>
  