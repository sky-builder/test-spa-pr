/**
 * 单元测试示例，演示如何替换掉API请求；
 * 可删除；
 */
import CommonQuestions from '@/views/Example/CommonQuestions';
import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import ElementUI from 'element-ui';

Vue.use(ElementUI);

describe('CommonQuestions.vue', () => {
  it('list.length should be 1', () => {
    // 新建一个stub，使之被调用时返回一个空数组
    let getListStub = sinon.stub.returns([
      {
        'questionId': '58f7184700000b0f144fa04d',
        'description': '查不到某科目的考试成绩',
        'typeName': '考试成绩/分析报告类',
        'viewCount': 5733,
        'usefulRatio': 0.29
      }
    ]);
    // shallowMount 方法只挂载组件而不渲染其子组件 (即保留它们的存根)
    var wrapper = shallowMount(
      CommonQuestions,
      {
        methods: {
          // 替换掉组件内真正的API请求方法
          getCommonList: getListStub
        }
      }
    );
    return Vue.nextTick().then(() => {
      expect(wrapper.vm.list).to.be.empty;
    });
  });
});
