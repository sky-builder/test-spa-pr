// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import { sync } from 'vuex-router-sync';

import ElementUI from 'element-ui';
import Axios from '@/assets/plugin/axios';
import checkResp from '@/assets/plugin/checkResp';
import isMobile from '@/assets/plugin/isMobile';
import handleError from '@/assets/plugin/handleError';
import titleMixin from '@/assets/plugin/title';
import TrackPlugin from '@/assets/plugin/track';

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

Vue.use(ElementUI);
Vue.use(Axios);
Vue.use(checkResp);
Vue.use(isMobile);
Vue.use(handleError);

// 埋点指令注册
Vue.use(TrackPlugin, feConfig.trackPoint);

// mixin for handling title
Vue.mixin(titleMixin);

/* eslint-disable */
'use strict'; Promise.prototype.finally = function (t) { var n = this.constructor; return this.then(function (r) { return n.resolve(t()).then(function () { return r }) }, function (r) { return n.resolve(t()).then(function () { throw r }) }) }

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
