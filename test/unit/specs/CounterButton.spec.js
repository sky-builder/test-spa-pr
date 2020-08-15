/**
 * origin: https://github.com/matt-oconnell/testing-testing
 * Counter.vue、CounterButton.vue、CounterDisplay.vue
 * 以上三个组件作用是展示如何解耦测试各自的逻辑；
 * CounterButton组件的作用是被点击后触发“increment”事件
 */
import CounterButton from '@/views/Example/CounterButton';
import { shallowMount } from '@vue/test-utils';

describe('CounterButton.vue', () => {
  it('should emit an event after being clicked', () => {
    let wrapper = shallowMount(CounterButton);
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted().increment).not.to.be.undefined;
  });
});
