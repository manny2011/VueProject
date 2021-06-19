<template>
  <div>
    <el-button type="primary" plain @click="dialogFormVisible = true"
      >添加分类</el-button
    >
    <el-table :data="tableData" stripe style="width: 100%">
      <!-- 就是个怎么使用这插件而已 -->
      <el-table-tree-column
        file-icon="icon icon-file"
        folder-icon="icon icon-folder"
        prop="cat_name"
        label="分类名称"
        width="220"
        parentKey="cat_pid"
        treeKey="cat_id"
        levelKey="cat_level"
        :indentSize="30"
      ></el-table-tree-column>

      <el-table-column label="是否有效" width="180">
        <!-- 需要处理完再显示，就用自定义列内容！ -->
        <template slot-scope="scope">
          <span>{{ scope.row.cat_deleted ? "无效" : "有效" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level == 0">一级</span>
          <span v-else-if="scope.row.cat_level == 1">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级名称" :label-width="formLabelWidth">
          <!-- :xxx=''提供一个动态的数据 -->
          <el-cascader
            v-model="form.value"
            :options="options1"
            :props="getPropsObj"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getAllData();
    this.getAllData1();
  },
  data() {
    return {
      msg: "category",
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: "",
        value: []
      },
      formLabelWidth: "120px",
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            }
          ]
        }
      ],
      options1: [],

      getPropsObj: {
        label: "cat_name",
        value: "cat_id"
      }
    };
  },
  methods: {
    async getAllData() {
      let res = await this.$axios.get("categories", {
        params: {
          type: 3
        }
      });
      console.log(res);
      this.tableData = res.data.data;
    },

    async getAllData1() {
      let res = await this.$axios.get("categories", {
        params: {
          type: 2
        }
      });
      console.log(res);
      this.options1 = res.data.data;
    },

    async confirmAdd() {
      const { name, value } = this.form;
      let res = await this.$axios.post("categories", {
        cat_pid: value[value.length - 1],
        cat_name: name,
        cat_level: value.length
      });
      console.log(res);
      if(res.data.data){
        this.$message({
          type:'success',
          message:res.data.meta.msg
        })
        this.dialogFormVisible = false;
        this.getAllData()
      }else{
        this.$message({
          type:'error',
          message:res.data.meta.msg
        })
      }
    }
  }
};
</script>

<style></style>
