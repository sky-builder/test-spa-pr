/**
 * origin: https://github.com/matt-oconnell/testing-testing
 * Counter.vue、CounterButton.vue、CounterDisplay.vue
 * 以上三个组件作用是展示如何解耦测试各自的逻辑；
 * CounterDisplay组件作为展示型组件，只需要正确处理props就行；
 */
import CounterDisplay from '@/views/Example/CounterDisplay';
import { shallowMount } from '@vue/test-utils';

describe('CounterDisplay.vue', () => {
  it('should display 888', () => {
    let wrapper = shallowMount(CounterDisplay);
    wrapper.setProps({ count: 888 });
    expect(+wrapper.find('marquee').text()).to.equal(888);
  });
});
