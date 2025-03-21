import { createStore } from 'vuex';
import api from '@/utils/api'; // Импортируем API

export default createStore({
  state: {
    token: localStorage.getItem('user_token') || null, // Токен пользователя
    cartItems: [],
    products: [],
    isAuthenticated: false,
  },
  getters: {
    isAuthenticated: (state) => !!state.token, // Проверка авторизации
    cartItems: (state) => state.cartItems,
    products: (state) => state.products,
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
    ADD_TO_CART(state, productId) {
      state.cartItems.push(productId);
    },
    REMOVE_FROM_CART(state) {
      state.cartItems.pop();
    },
    SET_AUTHENTICATED(state, status) {
      state.isAuthenticated = status; // Устанавливаем статус аутентификации
    },
    CLEAR_CART(state) {
      state.cartItems = []; // Очищаем корзину при выходе
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
    logout({ commit }, router) {
      return new Promise((resolve) => {
        commit('CLEAR_CART'); // Очищаем корзину
        commit('clearToken'); // Удаляем токен
        router.push('/login'); // Перенаправляем на страницу авторизации
        resolve(); // Уведомляем, что действие завершено
      });
    },
    addToCart({ commit }, productId) {
      commit('ADD_TO_CART', productId);
    },
    removeFromCart({ commit }) {
      commit('REMOVE_FROM_CART');
    },

  },
});