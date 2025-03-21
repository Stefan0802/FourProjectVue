<template>
  <div>
    <h1>Корзина</h1>
    <div v-if="cartProducts.length === 0">Корзина пуста</div>
    <div v-else>
      <ul>
        <li v-for="product in cartProducts" :key="product.id">
          <h2>{{ product.name }}</h2>
          <p>Цена: {{ product.price.toFixed(2) }} руб.</p>
          <button @click="removeFromCart(product.id)">Удалить</button>
        </li>
      </ul>
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
    ...mapActions(['removeFromCart']),
  },
};
</script>

<style scoped>

</style>
