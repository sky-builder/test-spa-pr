<template>
<div>
  <header>{{ info.title }}</header>
</div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          title: '标题'
        };
      }
    }
  }
};
</script>

<style lang="less" scoped>
header {
  font-weight: normal;
}
</style>
