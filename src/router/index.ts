import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

const MonacoEditorDemo = () => import('../views/MonacoEditorDemo.vue');

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/monaco-editor-demo',
    name: 'MonacoEditorDemo',
    component: MonacoEditorDemo,
  },
  {
    path: '/azure',
    name: 'Azure',
    component: () => import(/* webpackChunkName: "azure-static-web-apps" */ '../views/Azure.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
