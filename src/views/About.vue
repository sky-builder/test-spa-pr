<template>
  <div>
    hello,{{ name }}
        <a href="/">home</a>
    <router-link to="/">home router-link</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'alice'
    };
  }
};
</script>

<style>

</style>
