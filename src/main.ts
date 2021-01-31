/* eslint-disable @typescript-eslint/no-var-requires */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

if (process.env.VUE_APP_USE_MSW === 'yes') {
  // eslint-disable-next-line global-require
  const { worker } = require('./mocks/browser');
  worker.start();
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
