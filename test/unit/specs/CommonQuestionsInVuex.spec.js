/**
 * 单元测试示例，演示如何测试使用Vuex的组件
 * 可删除；
 */
import CommonQuestions from '@/views/Example/CommonQuestionsInVuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';

Vue.use(ElementUI);

describe('CommonQuestionsInVuex.vue', () => {
  it('list.length should be 1', () => {
    let mockModule = {
      state: {
        commonQuestions: []
      },
      mutations: {
        QUESTION_SET_COMMON_LIST(state, list) {
          state.commonQuestions = list || [];
        }
      },
      actions: {
        QuestionGetCommonList({ commit }) {
          return Promise.resolve([
            {
              'questionId': '58f7184700000b0f144fa04d',
              'description': '查不到某科目的考试成绩',
              'typeName': '考试成绩/分析报告类',
              'viewCount': 5733,
              'usefulRatio': 0.29
            }
          ]).then(list => {
            commit('QUESTION_SET_COMMON_LIST', list);
          });
        }
      }
    };
    let localVue = createLocalVue();
    localVue.use(Vuex);
    let store = new Vuex.Store({
      modules: {
        question: mockModule
      }
    });
    var wrapper = shallowMount(
      CommonQuestions,
      {
        store,
        localVue
      }
    );
    // 涉及到API调用，待当前macroTask执行完后再检查接口返回的数据
    return Vue.nextTick().then(() => {
      expect(wrapper.vm.list).to.have.lengthOf(1);
    });
  });
});
