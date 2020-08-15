import Axios from 'axios';
import Vue from 'vue';

const env = process.env.NODE_ENV;

const instance = Axios.create({
  withCredentials: true,
  timeout: 20000
});

instance.interceptors.request.use(config => {
  if (config.baseURL) return config;
  let baseAPI = '';
  let toPath = '';

  const paths = config.url.split('/');
  const rpc = feConfig.api.find((rpc) => rpc.name === paths[1]);

  if (rpc) {
    baseAPI = rpc.host;
  } else {
    Vue.prototype.$message.error(`${paths[1]} 对应的转发 HOST 未设置，请在 feConfig 目录下设置`);
  }
  if (env === 'development') {
    toPath = [].concat([''], paths.slice(1)).join('/');
  } else {
    toPath = [].concat([''], paths.slice(2)).join('/');
  }

  config.url = baseAPI + toPath;
  return config;
});

instance.interceptors.response.use(response => {
  if (response && Enums.ErrorCode.CookieInvalid === response.data.code) {
    location.href = '/login';
  }
  return response.data;
}, (err) => {
  // 请求已经完成，但是返回状态不是 2xx
  // err.response 承载的是请求失败返回的错误相关信息
  // err.response.data 承载的是请求失败后端返回的错误内容
  // 该类型报错返回 Promise.reject ,触发请求的 catch ,在 catch 中处理错误
  if (err.response) {
    /* eslint prefer-promise-reject-errors: 0 */
    return Promise.reject({
      config: err.response.config,
      code: err.response.status,
      data: err.response.data
    });
  }
  // 在设置触发错误的请求时发生了其他错误
  return Promise.reject({ code: 1024, message: err.message, config: err });
});

function axios(options) {
  let cookie = null;
  if (options.cookie) {
    cookie = `${options.cookie.key}=${options.cookie.value}`;
    delete options.cookie;
  }
  const instance = Axios.create(Object.assign({
    timeout: 4000
  }, options, cookie ? { headers: { 'Cookie': cookie } } : {}));
  return instance;
}

function plugin(Vue) {
  if (plugin.installed) {
    return;
  }
  Vue.http = instance;
  Vue.axios = axios;
  Object.defineProperty(Vue.prototype, '$http', { value: instance });
  Object.defineProperty(Vue.prototype, '$axios', { value: axios });
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
