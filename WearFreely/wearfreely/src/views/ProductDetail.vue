<template>
    <div class="product-detail" v-if="product">
      <button @click="$router.go(-1)" class="back-button"><img src="@/assets/shopping/fanhui.svg" alt="返回"></button>
      <img :src="product.image" :alt="product.title" class="detail-image" />
      <div class="detail-info">
        <h1>{{ product.title }}</h1>
        <p class="price">¥{{ product.price }}</p>
        <p class="description">{{ product.description }}</p>
        <button @click="addToCart">加入购物车</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useCartStore } from '@/store/cart.js';
  
  export default {
    data() {
      const cartStore = useCartStore();
      return {
        product: null,
        cartStore
      };
    },
    methods: {
      async fetchProduct() {
        const id = this.$route.params.id;
        try {
          const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
          this.product = response.data;
        } catch (error) {
          console.error('获取商品详情失败:', error);
        }
      },
      addToCart() {
        this.cartStore.addItem(this.product);
      },
    },
    mounted() {
      this.fetchProduct();
    },
  };
  </script>
  
  <style scoped>
  .product-detail {
    display: flex;
    gap: 20px;
    padding: 5px;
  }
  .detail-image {
    width: 200px;
    object-fit: contain;
  }
  .detail-info {
    flex: 1;
  }
  .price {
    font-size: 24px;
    color: #e63946;
  }
  .back-button {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 8px 16px;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>