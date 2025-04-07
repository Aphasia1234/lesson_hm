// 购物车
<template>
    <div class="cart-dropdown">
      <div v-if="cartStore.items.length === 0"><img src="@/assets/shopping/cart.svg" alt="空"></div>
      <div v-else>
        <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.title" width="50" />
          <span>{{ item.title }} <img src="@/assets/shopping/chenghao4.svg" alt="x"> {{ item.quantity }}</span>
          <br/>
          <span>¥{{ (item.price * item.quantity).toFixed(2) }}</span>
          <button @click="cartStore.removeItem(item.id)"><img src="@/assets/shopping/shanchu.svg" alt="删除"></button>
        </div>
        <div class="cart-total"><strong>总计: ¥{{ cartStore.totalPrice.toFixed(2) }}</strong></div>
      </div>
    </div>
  </template>
  
  <script>
  import { useCartStore } from '@/store/cart';
  export default {
    setup() {
      const cartStore = useCartStore();
      return { cartStore };
    },
  };
  </script>