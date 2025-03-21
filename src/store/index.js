import { createStore } from 'vuex';
import api from '@/utils/api';

export default createStore({
  state: {
    token: localStorage.getItem('user_token') || null,
    cartItems: [],
    products: [],
    isAuthenticated: false,
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    cartItems: (state) => state.cartItems,
    products: (state) => state.products,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('user_token', token);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('user_token');
    },
    ADD_TO_CART(state, productId) {
      state.cartItems.push(productId);
    },
    REMOVE_FROM_CART(state) {
      state.cartItems.pop();
    },
    SET_AUTHENTICATED(state, status) {
      state.isAuthenticated = status;
    },
    CLEAR_CART(state) {
      state.cartItems = [];
    },
  },
  actions: {
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        api.login(credentials)
            .then((response) => {
              commit('setToken', response.data.data.user_token);
              resolve(response);
            })
            .catch((error) => {
              console.error('Ошибка авторизации:', error);
              reject(error);
            });
      });
    },
    logout({ commit }, router) {
      return new Promise((resolve) => {
        commit('CLEAR_CART');
        commit('clearToken');
        router.push('/login');
        resolve();
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