<!--
  采用Vuex的常见问题列表，此处仅是单元测试示例作用
-->
<template>
<div class="list">
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
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      list: state => state.question.commonQuestions
    })
  },
  beforeMount() {
    this.QuestionGetCommonList().catch(err => {
      this.$handleError(err, '请求失败');
    });
  },
  methods: {
    ...mapActions(['QuestionGetCommonList'])
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
