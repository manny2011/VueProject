<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="id"
        label="#"
        width="180"
        type="index"
        :index="generateIndex"
      >
      </el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180">
      </el-table-column>
      <el-table-column prop="path" label="路径" width="180"> </el-table-column>
      <el-table-column prop="level" label="等级">
        <!-- 条件渲染 -->
        <template slot-scope="scope">
          <span v-if="scope.row.level == 0">一级</span>
          <span v-else-if="scope.row.level == 1">二级</span>
          <span v-else-if="scope.row.level == 2">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  created() {
    this.getData();
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      tableData: []
    };
  },
  methods: {
    async getData() {
      let res = await this.$axios.get("rights/list");
      console.log(res);
      if (res.data.meta.status === 200) {
        this.tableData = res.data.data;
      } else {
        this.$message({
          message: res.data.meta.msg,
          type: "error"
        });
      }
    },
    generateIndex(index) {
      //自定义索引号
      return index + 1;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
