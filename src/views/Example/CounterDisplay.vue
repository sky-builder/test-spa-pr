<!--
    origin: https://github.com/matt-oconnell/testing-testing
    Counter.vue、CounterButton.vue、CounterDisplay.vue
    以上三个组件作用是展示如何解耦测试各自的逻辑, 可删除；
-->
<template>
  <div>
    I can do what I want with my count!
    <marquee>{{ count }}</marquee>
  </div>
</template>

<script>
export default {
  name: 'CounterDisplay',
  props: {
    count: Number
  }
};
</script>
