<template>
    <el-upload
      v-model:file-list="fileList"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>
  
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { Plus } from '@element-plus/icons-vue'
  import type { UploadProps, UploadUserFile } from 'element-plus'
  
  const fileList = ref<UploadUserFile[]>([
    {
      name: 'food.jpeg',
      url: 'https://pic.rmb.bdstatic.com/bjh/down/w6UD7pkrx7IQ2u54NTio6Q2b76ef19c94ad86795c83ff4f21659ba.jpg?for=bg',
    },
    {
      name: 'plant-1.png',
      url: 'https://n.sinaimg.cn/sinakd20112/728/w2048h2680/20211123/d5cd-d10b3854d14c526be5f56d4cc1dd37d1.jpg',
    },
    {
      name: 'plant-2.png',
      url: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2022%2F0507%2F29c692f2j00rbi9kv002hc000hs00n6c.jpg&thumbnail=660x2147483647&quality=80&type=jpg',
    }
  ])
  
  const dialogImageUrl = ref('')
  const dialogVisible = ref(false)
  
  const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
  }
  
  const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
  }
  </script>