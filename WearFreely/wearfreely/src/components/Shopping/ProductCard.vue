<template>
    <div class="product-card" @click="goToDetail">
      <img :src="product.image" :alt="product.title" class="product-image" />
      <h3>{{ product.title }}</h3>
      <p class="price">¥{{ product.price }}</p>
      <SelfButton @click.stop="addToCart" class="buttoncart"><img src="@/assets/shopping/cart.svg" alt=""></SelfButton>
    </div>
  </template>
  
  <script>
  import SelfButton from '@/components/SelfButton.vue'
  export default {
    components: {
      SelfButton
    },
    props: {
      product: Object,
    },
    methods: {
      goToDetail() {
        this.$router.push(`/product/${this.product.id}`);
      },
      addToCart() {
        this.$emit('add-to-cart', this.product);
      },
    },
  };
  </script>
  
  <style scoped>
  .product-card {
    border: 2px solid #eee;
    box-shadow: gray 2px 2px 5px;
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
    transition: transform 0.3 ease;
    background-color: white;
  }
  .product-card:hover {
    transform: translateY(-10px);
  }
  .product-image {
    width: 50%;
    height: 100px;
    object-fit: contain;
  }
  .price {
    color: #e63946;
    font-weight: bold;
  }
  </style>