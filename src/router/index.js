import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store'; // Импортируем Vuex store

const routes = [
    { path: '/', name: 'Catalog', component: () => import('@/views/CatalogView.vue') },
    { path: '/login', name: 'Login', component: () => import('@/views/LoginView.vue') },
    { path: '/register', name: 'Register', component: () => import('@/views/Register.vue') },
    // { path: '/cart', name: 'Cart', component: () => import('@/views/Cart.vue') },
    // { path: '/orders', name: 'Orders', component: () => import('@/views/Orders.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Навигационные хуки для проверки авторизации
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated; // Проверяем, авторизован ли пользователь

    // Если пользователь пытается попасть на защищенный маршрут без авторизации
    if (to.name !== 'Login' && to.name !== 'Register' && !isAuthenticated) {
        next({ name: 'Login' }); // Перенаправляем на страницу входа
    }
    // Если авторизованный пользователь пытается попасть на страницу входа или регистрации
    else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
        next({ name: 'Catalog' }); // Перенаправляем на главную страницу
    }
    // В остальных случаях разрешаем переход
    else {
        next();
    }
});

export default router;