<template>
  <div id="app" class="layout">
    <a href="/about">about about</a>
    <router-link to="/about">about router-link</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import jsCookie from 'js-cookie';

export default {
  title: '爱云校',
  created() {
    if (jsCookie.get(feConfig.cookie)) {
      this.USER_GET_PROFILE()
        .catch(err => {
          this.$handleError(err, '获取错误');
        });
    }
  },
  methods: {
    ...mapActions([
      'USER_GET_PROFILE'
    ])
  }
};
</script>
<style lang="less">
@import "assets/styles/main";

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
