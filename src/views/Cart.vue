<template>
  <div>
    <h1>Корзина</h1>
    <div v-if="cartProducts.length === 0">Корзина пуста</div>
    <div v-else>
      <div>
        <div v-for="product in cartProducts" :key="product.id">
          <h2>{{ product.name }}</h2>
          <img :src="getImageUrl(product.image)" :alt="product.name" class="image">
          <p>Цена: {{ product.price.toFixed(2) }} руб.</p>
        </div>
      </div>
      <button @click="removeFromCart">Удалить последнию</button>
      <h3>Итого: {{ totalPrice.toFixed(2) }} руб.</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import api from '@/utils/api';

export default {
  name: 'ShoppingCart',
  computed: {
    ...mapGetters(['cartItems']),
    cartProducts() {

      if (!this.cartItems) {
        return [];
      }
      return this.cartItems.map(id => this.products.find(product => product.id === id)).filter(Boolean);
    },
    totalPrice() {
      return this.cartProducts.reduce((total, product) => total + product.price, 0);
    },
  },
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.fetchProducts();
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
    ...mapActions(['removeFromCart']),
  },
};
</script>

<style scoped>
.image{
  max-width: 10%;
  height: auto;
}
</style>
