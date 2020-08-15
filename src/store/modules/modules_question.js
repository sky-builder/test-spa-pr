import Vue from 'vue';

export default {
  state: {
    commonQuestions: []
  },
  mutations: {
    QUESTION_SET_COMMON_LIST(state, list) {
      state.commonQuestions = list || [];
    }
  },
  actions: {
    QuestionGetCommonList(context) {
      //  返回一个promise，调用出错时处理逻辑在上层捕获 & 处理;
      return Vue.http.get(
        '/hfscsq/v1/cs-question/user-sides/2/product-types/all/common-questions'
      ).then(resp => {
        return Vue.checkResp(resp);
      }).then(list => {
        context.commit('QUESTION_SET_COMMON_LIST', list);
      });
    }
  }
};
