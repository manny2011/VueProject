<template>
  <div>
    <el-button type='primary' @click="go2AddPage">添加</el-button>
    <el-table :data="tableData.goods" height="450" border style="width: 100%">
      <el-table-column label="#" width="180" type="index" :index="2">
      </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="goods_price" label="商品价值" width="180">
      </el-table-column>
      <el-table-column prop="goods_number" label="商品数量"> </el-table-column>
      <el-table-column prop="upd_time" label="创建时间"> </el-table-column>
      <el-table-column prop="is_promote" label="操作"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  created() {
    this.getAllData();
  },
  data() {
    return {
      tableData: {
        pagenum:'',
        total:'',
        goods: [
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路1518弄"
          }
        ]
      }
    };
  },
  methods: {
    async getAllData() {
      let res = await this.$axios.get("goods", {
        params: {
          query: "",
          pagenum: "1",
          pagesize: "5"
        }
      });
      console.log(res);
      this.tableData = res.data.data;
    },
    go2AddPage(){
      console.log('click');
      this.$router.push({name:'addGood'})
    }
  }
};
</script>

<style></style>
