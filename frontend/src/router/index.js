import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
// import store from '../store';
Vue.use(VueRouter);

Vue.prototype.$axios = axios;
const apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api' : '/api';
// const apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://192.168.152.197:3333/api' : '/api';
Vue.prototype.$apiRootPath = apiRootPath;
axios.defaults.baseURL = apiRootPath;
console.log(axios.defaults.baseURL);
// default as get token in headers
/* eslint-disable */
axios.interceptors.request.use((config) => {
  config.headers.authorization = localStorage.getItem('accessToken');
  return config;
}, (error) => Promise.reject(error));


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
