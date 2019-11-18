import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
Vue.config.productionTip = false;
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
Vue.use(VueResource);
import HomeComponent from './components/HomeComponent';
import AddEventComponent from './components/AddEventComponent';
import SearchByDateComponent from './components/SearchByDateComponent';
import IndexComponent from './components/IndexComponent';

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeComponent
  },
  {
    name: 'add',
    path: '/add',
    component: AddEventComponent,
    props: true
  },
  {
    name: 'search',
    path: '/search',
    component: SearchByDateComponent
  },
  {
    name: 'events',
    path: '/events',
    component: IndexComponent
  }
];

const router = new VueRouter({mode: 'history', routes: routes});

new Vue(Vue.util.extend({router}, App)).$mount('#app');

