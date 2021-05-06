import axios from 'axios';
import Vue from 'vue';
import Toasted from 'vue-toasted';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Toasted, { duration: 2000 });

(window as any).axios = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
