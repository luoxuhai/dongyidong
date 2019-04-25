import Vue from 'vue';
import App from './App';
import store from './store';
import { networkError } from './libs/utils';
import '../static/styles/common.css';

Vue.prototype.$store = store;
Vue.prototype.networkError = networkError;
Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App, store);
app.$mount();
