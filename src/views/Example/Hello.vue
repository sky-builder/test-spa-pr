<template>
  <div class="hello" v-stat="{id : 'notice_usercenter_xxlb_show'}">
    <img class="logo" src="../../assets/images/common/iyunxiao_logo.png" alt="logo" @click="clickLogo">
    <h1>{{ msg }}</h1>
    <h2>links</h2>
    <ul>
      <li><a href="http://www.aiyunxiao.com" target="_blank">爱云校主站</a></li>
      <li><a href="http://wiki.iyunxiao.com/pages/viewpage.action?pageId=150602338" target="_blank">脚手架wiki</a></li>
    </ul>
    <HelloLinks :links-info="codeLintLinks"/>
  </div>
</template>

<script>
import HelloLinks from './src/HelloLinks';

export default {
  name: 'Hello',
  title: 'Hello',
  components: { HelloLinks },
  data() {
    return {
      msg: 'Welcome to Aiyunxiao Vue Single Page Scaffold',
      codeLintLinks: {
        title: '编码规范',
        links: [
          {
            url: 'https://standardjs.com/rules-zhcn.html',
            caption: 'standard'
          },
          {
            url: 'https://github.com/vuejs/eslint-plugin-vue#bulb-rules',
            caption: 'eslint-vue-plugin'
          },
          {
            url: 'https://stylelint.io/user-guide/rules/',
            caption: 'stylelint'
          }
        ]
      }
    };
  },
  methods: {
    clickLogo() {
      alert('welcome!');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
html,
body {
  background-color: #fff;
}

.hello {
  margin-top: 50px;
  text-align: center;
}

h1,
h2 {
  font-weight: normal;
}

h1 {
  margin: 21px 0;
  font-size: 2em;
}

h2 {
  margin: 20px 0;
  font-size: 1.5em;
}

.logo {
  margin: 0 auto;
}

ul {
  padding: 0;
  line-height: 1.5;
  list-style-type: none;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
