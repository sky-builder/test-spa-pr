import Vue from 'vue';

export default {
  state: {
    profile: {}
  },
  mutations: {
    USER_SET_PROFILE(state, payload) {
      state.profile = payload || {};
    }
  },
  actions: {
    // 学生端、家长端登录
    UserPostLogin(ctx, { loginName, password, roleType, rememberMe }) {
      return Vue.http.post('/hfsbe/v2/users/sessions', {
        loginName, password, roleType, rememberMe
      }).then(data => {
        ctx.commit('USER_SET_PROFILE', data);
        return data;
      });
    }
  },
  getters: {
    // 学生端、家长端登录
    userGetUserInfo(state) {
      // 在这可以添加各种逻辑

      return state.profile;
    }
  }
};
