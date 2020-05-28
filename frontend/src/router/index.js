import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
// import store from '../store';

Vue.prototype.$axios = axios;
const apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:8000/api/' : '/api/';
Vue.prototype.$apiRootPath = apiRootPath;
axios.defaults.baseURL = apiRootPath;

// default as get token in headers
/* eslint-disable */
// axios.interceptors.request.use((config) => {
//   config.headers.authorization = localStorage.getItem('token');
//   return config;
// }, (error) => Promise.reject(error));

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
