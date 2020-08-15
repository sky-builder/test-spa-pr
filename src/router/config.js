var authRoutes = [
  {
    path: '/',
    name: 'Hello',
    component: 'Example/Hello'
  },
  // 常见问题列表，仅做单元测试演示用，可删除
  {
    path: '/common-questions',
    name: 'CommonQuestions',
    component: 'Example/CommonQuestions'
  },
  // Vuex版常见问题列表，仅做单元测试演示用，可删除
  {
    path: '/common-questions-vuex',
    name: 'CommonQuestionsInVuex',
    component: 'Example/CommonQuestionsInVuex'
  },
  // 计数器示例
  {
    path: '/counter',
    name: 'Counter',
    component: 'Example/Counter'
  },
  // 登录后首页
  {
    path: '/login',
    name: 'Login',
    component: 'Example/Login'
  },
  // 登录后首页
  {
    path: '/test-demo',
    name: 'TestDemo',
    component: 'Example/TestDemo'
  }
];

var baseRoutes = [
  // 404
  {
    path: '*',
    name: 'NotFound',
    component: 'Error/NotFound'
  }
];

const routers = authRoutes.concat(baseRoutes);

export {
  routers,
  baseRoutes,
  authRoutes
};
