var ua = navigator.userAgent.toLowerCase() || window.navigator.userAgent.toLowerCase();
var isMobile = ua.indexOf('mobi') !== -1;

function plugin(Vue) {
  if (plugin.installed) {
    return;
  }
  Object.defineProperty(Vue.prototype, '$isMobile', { value: isMobile });
  // 向前兼容
  Vue.isMobile = isMobile;
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
