import Vue from 'vue';
import TestDemo from '@/views/Example/TestDemo';
import { shallowMount, mount } from '@vue/test-utils';

describe('TestDemo.vue', function() {
  it('普通按钮的点击事件', () => {
    const wrapper = shallowMount(TestDemo);
    const button = wrapper.find('button.commonBtn');
    button.trigger('click');
    expect(wrapper.vm.msg).to.be.equal('msg has changed');
  });
  it('UI组件按钮点击事件', () => {
    const wrapper = mount(TestDemo);
    // 注意这里要使用mount, 如果使用shallowMount渲染出来的按钮是stub，会导致取不到
    const button = wrapper.find('button.elementBtn');
    button.trigger('click');
    expect(wrapper.vm.msg).to.be.equal('msg has changed');
  });
  it('异步渲染列表', () => {
    const wrapper = shallowMount(TestDemo);
    /**
     * 注意一定不要这样写
     * 任何在nextTick内部被抛出的错误都不会被测试运行器捕获，
     * 因为其内部使用了 Promise。关于这个问题有两个建议：
     * 要么你可以在测试的一开始将 Vue 的全局错误处理器设置为 done 回调，
     * 要么你可以在调用 nextTick 时不带参数让其作为一个
     */

    // 错误写法
    // wrapper.vm.$nextTick(() => {
    //   // 异常不会被捕获，这样的用例等于没写 (断言库还是会抛出错误的)
    //   expect(wrapper.vm.list).to.be.empty;
    //   expect(wrapper.vm.list).not.to.be.empty;
    // });

    // 正确写法 01
    // Vue.config.errorHandler = done;
    // wrapper.vm.$nextTick(() => {
    //   expect(wrapper.vm.list).not.to.be.empty;
    //   done();
    // });

    // 正确写法 02 (推荐)
    return Vue.nextTick().then(() => {
      expect(wrapper.vm.list).not.to.be.empty;
    });
  });
  it('el-table 数据渲染01', () => {
    const wrapper = mount(TestDemo);
    // 注意这里会找不到button
    const button = wrapper.find('button.tableBtn');
    console.log(button);
  });
  it('el-table 数据渲染02', () => {
    // sync 属性详见 vue test utils api
    const wrapper = mount(TestDemo, { sync: false });
    return Vue.nextTick().then(() => {
      const button = wrapper.find('button.tableBtn');
      button.trigger('click'); // do something...
    });
  });
});
