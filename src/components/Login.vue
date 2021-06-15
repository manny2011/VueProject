<template>
  <div class="login-root">
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="8">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitForm('ruleForm')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable*/
// import axios from "axios";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this.$refs[formName]);
      this.$refs[formName].validate((valid, obj) => {
        if(!valid){
          console.log(valid, obj);
          return false
        }
        this.$axios
          .post("login", this.ruleForm)
          .then(res => {
            if (res.data.meta.status === 200) {
              console.log(res);
              localStorage.setItem('token',res.data.data.token)
              this.$message({
                message: "登陆成功！",
                type: "success",
                showClose: true,
                center: "true",
                duration: 1500
              });
              this.$router.replace({name:'home'});
            } else {
              this.$message({
                message: "登陆失败!",
                type: "error",
                duration: 1500
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    resetForm(formName) {
      console.log(formName);
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<!-- 指定当前样式只在当前组件内生效 -->
<style scoped>
html,
body,
#app,
.el-row {
  height: 100%;
  background-color: #2d434c;
}
* {
  margin: 0;
  padding: 0;
}
.el-col {
  border-radius: 10px;
  background-color: #fff;
  padding: 20px;
}
.login-root {
  height: 100%;
  /* background-color: #999; */
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.bg-purple-dark {
  background: #99a9bf;
}
</style>
