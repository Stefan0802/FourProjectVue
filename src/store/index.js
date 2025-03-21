import { createStore } from 'vuex';
import api from '@/utils/api'; // Импортируем API

export default createStore({
  state: {
    token: localStorage.getItem('user_token') || null, // Токен пользователя
  },
  getters: {
    isAuthenticated: (state) => !!state.token, // Проверка авторизации
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('user_token', token); // Сохраняем токен в localStorage
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('user_token'); // Удаляем токен из localStorage
    },
  },
  actions: {
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        api.login(credentials)
            .then((response) => {
              commit('setToken', response.data.data.user_token); // Сохраняем токен
              resolve(response);
            })
            .catch((error) => {
              console.error('Ошибка авторизации:', error); // Логирование ошибок
              reject(error);
            });
      });
    },
    logout({ commit }) {
      commit('clearToken');
    },
    addToCart(state, productId) {
      // Логика для добавления товара в корзину
      // Например, вы можете создать массив для хранения товаров в корзине
      if (!state.cart) {
        state.cart = [];
      }
      state.cart.push(productId);
    },
  },
});