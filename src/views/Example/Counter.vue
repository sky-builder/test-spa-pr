<!--
    origin: https://github.com/matt-oconnell/testing-testing
    Counter.vue、CounterButton.vue、CounterDisplay.vue
    以上三个组件作用是展示如何解耦测试各自的逻辑, 可删除；
-->
<template>
  <div class="counter">
    <CounterDisplay :count="count"></CounterDisplay>
    <CounterButton @increment="increment"></CounterButton>
  </div>
</template>

<script>
import CounterDisplay from './CounterDisplay';
import CounterButton from './CounterButton';

export default {
  name: 'Counter',
  components: {
    CounterDisplay,
    CounterButton
  },
  data() {
    return {
      count: 0
    };
  },
  methods: {
    increment() {
      this.count++;
    }
  }
};
</script>
