/**
 * 单元测试示例，演示如何测试使用Vue-Router的组件
 * 可删除；
 */
import RouterTest from '@/views/Example/RouterTest';
import { shallowMount, createLocalVue } from '@vue/test-utils';

const localVue = createLocalVue();

describe('RouterTest.vue', () => {
  it('route path should be "/router-test"', () => {
    const wrapper = shallowMount(RouterTest, {
      localVue,
      mocks: {
        $route: {
          path: '/router-test'
        }
      }
    });
    expect(wrapper.find('.path').text()).to.equal('/router-test');
  });
});
