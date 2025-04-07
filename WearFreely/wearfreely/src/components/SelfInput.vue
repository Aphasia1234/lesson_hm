<!-- 自定义输入组件 -->
<template>
  <input type="text"
  :value="modelValue"
  @input="emit('update:modelValue',($event.target).value)"
  >
</template>

<script setup>
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
input{
  border:2px solid white;
  background-color: #FFDEE9;
  background-image: linear-gradient(45deg, #FFDEE9 0%, #B5FFFC 100%);
  height:30px;
  font-size:20px;
  color:black;
  border-radius: 6px;
}
</style>