<!--
    origin: https://github.com/matt-oconnell/testing-testing
    Counter.vue、CounterButton.vue、CounterDisplay.vue
    以上三个组件作用是展示如何解耦测试各自的逻辑，可删除；
-->
<template>
  <button @click="emitIncrement">++++Increment++++</button>
</template>

<script>
export default {
  name: 'CounterButton',
  methods: {
    emitIncrement() {
      this.$emit('increment');
    }
  }
};
</script>
