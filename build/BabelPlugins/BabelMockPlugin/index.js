const hasFeMock = {
  CallExpression: {
    enter(path) {
      const args = path.node.arguments.map(v => (v.extra || {}).rawValue);
      const inValid = args.filter(v => v && typeof v === 'string' && v.includes('feMock')).length;
      if (inValid) {
        throw Error('http请求包含feMock相关mock平台转发，请修改再打包📦');
      }
    }
  }
};

const isDev = process.env.NODE_ENV === 'development';

module.exports = function({ types: t }) {
  return {
    visitor: {
      FunctionExpression: {
        enter: function(path) {
          if (isDev) return;
          path.traverse(hasFeMock);
        }
      }
    }
  };
};
