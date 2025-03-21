import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://lifestealer86.ru/api-shop', // Замените на ваш API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default {
    login(credentials) {
        return apiClient.post('/login', credentials);
    },
    register(userData) {
        return apiClient.post('/signup', userData);
    },
    getProducts() {
        return apiClient.get('/products');
    },
    addToCart(productId, token) {
        return apiClient.post(`/cart/${productId}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
    getCart(token) {
        return apiClient.get('/cart', {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};