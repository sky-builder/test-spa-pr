import HelloLinks from '@/views/Example/src/HelloLinks';
import { shallowMount } from '@vue/test-utils';

describe('HelloLinks.vue', () => {
  const wrapper = shallowMount(HelloLinks, {
    propsData: {
      linksInfo: {
        title: 'test',
        links: [
          {
            caption: 'testCaption',
            url: ''
          }
        ]
      }
    }
  });
  /**
   * 设置wrapper的方法还有：
   * wrapper.setProps()
   */
  it('its title should be "test"', () => {
    expect(wrapper.find('h2').text()).to.be.equal('test');
  });

  it('its caption of the only link should be "testCaption"', () => {
    expect(wrapper.find('a').text()).to.be.equal('testCaption');
  });
});
