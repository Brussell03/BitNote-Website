import login from './view/loginView.vue';
import dashboard from './view/dashboardView';
import register from './view/registerView';

export default [
    { path: '/', component: dashboard },
    { path: '/dashboard', component: dashboard },
    { path: '/login', component: login },
    { path: '/register', component: register }
]