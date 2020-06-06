import Vue from 'vue';
import * as VeeValidate from 'vee-validate';

import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './vee-validate';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(VeeValidate); // add

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
