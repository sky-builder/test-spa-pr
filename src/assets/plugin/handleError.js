
export default {
  install(Vue) {
    function handleError(err, msg) {
      if (typeof arguments[0] === 'string') {
        err = {
          config: {},
          code: '',
          data: {
            msg: arguments[0]
          }
        };
      }
      const message = err.data && (err.data.msg || err.data.message || msg || '请求失败');
      Vue.prototype.$message.error(message);
    }
    Vue.handleError = handleError;
    Object.defineProperty(Vue.prototype, '$handleError', { value: handleError });
  }
};
