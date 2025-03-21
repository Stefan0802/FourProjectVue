import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const routes = [
    { path: '/', name: 'Catalog', component: () => import('@/views/CatalogView.vue') },
    { path: '/login', name: 'Login', component: () => import('@/views/LoginView.vue') },
    { path: '/register', name: 'Register', component: () => import('@/views/Register.vue') },
    { path: '/cart', name: 'Cart', component: () => import('@/views/Cart.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated;


    if (to.name !== 'Login' && to.name !== 'Register' && !isAuthenticated) {
        next({ name: 'Login' });
    }

    else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
        next({ name: 'Catalog' });
    }

    else {
        next();
    }
});

export default router;