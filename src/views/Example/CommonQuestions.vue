<!-- 常见问题列表，此处仅是单元测试示例作用 -->
<template>
<div class="list">
    <!-- <div class="title">常见问题</div>
    <div v-for="item in list" :key="item.questionId">{{ item.description }}</div> -->
    <el-card class="card">
        <div slot="header" class="clearfix">
            <span>常见问题</span>
        </div>
        <div v-for="item in list"
            :key="item.questionId"
            class="item">{{ item.description }}</div>
    </el-card>
</div>
</template>

<script>

export default {
  data() {
    return {
      list: []
    };
  },
  beforeMount() {
    this.getCommonList();
  },
  methods: {
    getCommonList() {
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  width: 800px;
  margin: 30px auto 0;

  .item {
    height: 50px;
    padding: 0 15px;
    line-height: 50px;
    border-bottom: 1px solid #eee;

    &:first-child {
      margin-top: -15px;
    }
  }
}
</style>
