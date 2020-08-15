import Vue from 'vue';
import Router from 'vue-router';
import { routers } from './config';
import { developImport, productionImport } from './dynamicImport';
const develop = process.env.NODE_ENV === 'development';
const _import = develop ? developImport : productionImport;

Vue.use(Router);

const loadRouters = (configs) => {
  return configs.map((item, index) => {
    const route = {};
    const { path, name, meta } = item;
    if (path && name) {
      route.path = path;
      route.name = name;
    } else {
      throw Error(`路由配置中第 ${index + 1} 个路由的 path 或 name 属性未配置，不能正常处理`);
    }

    if (meta) {
      route.meta = meta;
    }

    if (item.component) {
      route.component = _import(item.component);
      if (item.children) {
        // 递归 children
        route.children = loadRouters(item.children);
      }
    }

    if (item.redirect) {
      route.redirect = item.redirect;
    }

    return route;
  });
};

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }
  const position = {};
  if (to.hash) {
    position.selector = to.hash;
  }
  if (to.matched.some(m => m.meta.scrollToTop)) {
    position.x = 0;
    position.y = 0;
  }
  return position;
};

export default new Router({
  mode: 'history',
  scrollBehavior: scrollBehavior,
  routes: loadRouters(routers)
});
