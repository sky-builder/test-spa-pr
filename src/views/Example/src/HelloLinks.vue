<template>
<div>
  <h2>{{ linksInfo.title }}</h2>
  <ul>
    <li v-for="link in linksInfo.links" :key="link.url">
      <a :href="link.url" target="_blank">{{ link.caption }}</a>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    linksInfo: {
      type: Object,
      default: () => {
        return {
          title: '',
          links: []
        };
      }
    }
  }
};
</script>

<style lang="less" scoped>
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
  width: 200px;
  height: 200px;
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
