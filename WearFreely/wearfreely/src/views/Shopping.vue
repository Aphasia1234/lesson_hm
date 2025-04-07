<template>
  <div id="Shopping">
    <CartDropdown />
    <ScrollToTop />
    <h1>商品列表</h1> 
    <div class="filters">
      <select v-model="selectedCategory" class="sclouth">
        <option value="">所有分类</option>
        <option value="men's clothing">男装</option>
        <option value="women's clothing">女装</option>
        <option value="electronics">电子产品</option>
      </select>
    </div>
    <div class="product-list">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import ScrollToTop from '@/components/ScrollToTop.vue';
import ProductCard from '@/components/Shopping/ProductCard.vue';
import CartDropdown from '@/components/Shopping/CartDropdown.vue';
import { useCartStore } from '@/store/cart.js';

const products = ref([]);
const selectedCategory = ref('');
const cartStore = useCartStore();

const filteredProducts = computed(() => {
  if (!selectedCategory.value) return products.value;
  return products.value.filter(
    (product) => product.category === selectedCategory.value
  );
});

async function fetchProducts() {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    products.value = response.data;
  } catch (error) {
    console.error('获取商品失败:', error);
  }
}

function addToCart(product) {
  cartStore.addItem(product);
}

onMounted(() => {
  fetchProducts();
});
</script>


<style scoped>
#Shopping {
  background-color: #FFDEE9;
  background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  z-index:-1;
}
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}
.filters {
  margin: 20px 0;
}
.sclouth{
  width: 100px;
  height: 30px;
  margin:5px;
  border:#000000 solid 1px;
  background-color: #FFDEE9;
  background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);
}
</style>