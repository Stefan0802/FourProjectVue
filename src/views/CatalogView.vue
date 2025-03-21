<template>
  <div>
    <h1>Каталог товаров</h1>
    <div class="product-list">
      <div class="product" v-for="product in products" :key="product.id">
        <img :src="getImageUrl(product.image)" :alt="product.name">
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p>Цена: {{ product.price.toFixed(2) }} руб.</p>
        <button @click="addToCart(product.id)">добавить в корзину</button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/utils/api';
  import { mapActions } from "vuex";

  export default {
    name:  'CatalogVue',
    data(){
      return{
        products: []
      }
    },
    created() {
      this.fetchProducts()
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await api.getProducts();
          this.products = response.data.data;
        } catch (error) {
          console.error('Ошибка при получении данных о товарах:', error);
        }
      },
      getImageUrl(relativePath) {
        return `http://lifestealer86.ru/${relativePath}`;
      },
      ...mapActions(['addToCart']),
    }
  }
</script>

<style scoped>
.product-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 70%;
  margin: 0 auto;
}

.product {
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 200px;
  text-align: center;
}

.product > img{
  max-width: 100%;
  height: auto;
}
</style>