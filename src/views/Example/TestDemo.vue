<template>
  <div class="hello">
    <!-- 测试UI -->
    <button @click="clickBtn" class="commonBtn">普通按钮</button>
    <el-button @click="clickBtn" class="elementBtn">Element Button</el-button>
    <!-- 测试异步渲染 -->
    <ul>
      <li v-for="item in list" :key="item" class="list">{{ item }}</li>
    </ul>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        label="地址">
        <template slot-scope="scope">
          <el-button class="tableBtn">
            测试
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'TestDemo',
  title: '测试例子',
  data() {
    return {
      msg: 'test demo',
      list: [],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    };
  },
  beforeMount() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      new Promise(resolve => { resolve(); }).then(() => {
        this.list = [1, 2, 3, 4, 5];
      });
    },
    clickBtn() {
      this.msg = 'msg has changed';
    },
    clickLogo() {
      alert('welcome!');
    }
  }
};
</script>
<style>
</style>
