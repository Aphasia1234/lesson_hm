<!-- 自定义按钮组件 -->
<!-- 在Vue中，自定义按钮组件即使没有显式定义@绑定事件，
仍然可以使用@绑定函数事件，
这是因为Vue会自动将未在组件props中定义的属性
作为原生DOM事件绑定到根元素上。
这种机制使得我们可以直接在自定义组件上使用原生事件监听器。 -->
<template>
 <button>
 <!-- @click="$emit('click')" -->
 <slot>Button</slot>
 </button>
</template>

<script setup>

</script>

<style scoped>
button {
 height:40px;
 padding:5px;
 background-color: #FFDEE9;
 background-image: linear-gradient(45deg, #FFDEE9 0%, #B5FFFC 100%);
 color: black;
 border:2px solid white;
 border-radius: 6px;
 cursor: pointer;
 transition: background-color 0.3s;
}

button:hover {
 background-color: #ffffff;
}
</style>