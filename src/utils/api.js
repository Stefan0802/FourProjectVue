import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://lifestealer86.ru/api-shop',
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
};