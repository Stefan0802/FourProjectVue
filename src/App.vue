<template>
  <nav>
    <router-link to="/">Главная</router-link>
    <router-link to="/cart">Корзина ({{ cartCount }})</router-link>
    <button v-if="isAuthenticated" @click="handleLogout">Выйти</button>
  </nav>
  <router-view/>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'cartItems']),
    cartCount() {
      return this.cartItems.length; // Количество товаров в корзине
    },
  },
  methods: {
    ...mapActions(['logout']),
    async handleLogout() {
      await this.logout(this.$router); // Передаем router в действие logout
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
