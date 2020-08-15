import Vue from 'vue';
import Hello from '@/views/Example/Hello';
import { mount } from '@vue/test-utils';

// descirbe() 方法包含一组逻辑上有联系的测试单元
describe('Hello.vue', () => {
  let vm;
  // 后置钩子销毁实例
  afterEach(() => {
    vm.$destroy && vm.$destroy();
  });
  // 一个 it() 方法是一个测试单元
  it('should render correct contents', function() {
    // 可以使用箭头函数但要注意 this指向问题
    // 比如箭头函数中不能使用 this.timeout 、retries 、slow 等方法
    const Ctor = Vue.extend(Hello);
    vm = new Ctor().$mount(); // 或 new Vue(Hello).$mount();
    // 新建一个组件实例。调用$mount()后组件生命周期中的挂载相关钩子被调用，vm.$el赋予组件的DOM；
    const textContent = vm.$el.querySelector('div.hello > h1').textContent;
    expect(textContent).to.equal('Welcome to Aiyunxiao Vue Single Page Scaffold');
  });
  // 使用 Vue官方 test-utils的版本
  it('should render correct contents: test utils version', () => {
    // mount方法返回一个包裹器
    const wrapper = mount(Hello);
    // find方法直接返回包裹器，详见 vue test utils api
    let textContent = wrapper.find('.hello h1').text();
    expect(textContent).to.be.equal('Welcome to Aiyunxiao Vue Single Page Scaffold');
  });

  // 更新数据后检测DOM是否正常渲染
  it('should render new text', () => {
    const wrapper = mount(Hello);
    // test-utils同步更新DOM，因此不必使用nextTick
    wrapper.setData({ msg: 'a new text' });
    expect(wrapper.find('.hello h1').text()).to.be.equal('a new text');
  });

  // 触发一个点击事件
  it('should call method "clickLogo"', () => {
    // 声明一个stub (http://sinonjs.org/releases/v4.1.5/stubs/)，替换掉clickLogo方法
    let stubClickLogo = sinon.stub();
    const wrapper = mount(
      Hello,
      {
        methods: {
          clickLogo: stubClickLogo
        }
      }
    );
    // 找到图片并触发点击事件
    wrapper.find('.logo').trigger('click');
    // 响应点击事件的方法应该被调用
    expect(stubClickLogo.called).to.be.true;
  });
});
