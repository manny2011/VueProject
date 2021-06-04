<template>
  <el-container class="top-container">
    <el-header>
      <el-row>
        <el-col :span="8">
          <img src="../assets/logo.png" />
        </el-col>
        <el-col :span="8">
          <h1>电商后台管理平台</h1>
        </el-col>
        <el-col :span="8">
          <div class="right">
            <span>右边是个很重要的地方</span>
            <a class="logout" @click.prevent="logout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="roles">角色列表</el-menu-item>
            <el-menu-item index="rights">权限列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
/* eslint-disable*/
export default {
  methods: {
    async logout() {
      try {
        await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        localStorage.removeItem("token"); //退出时清除token
        this.$message({
          type: "success",
          message: "退出成功!"
        });
        this.$router.replace({ name: "login" });
      } catch (err) {
        this.$message({
          type: "info",
          message: "已取消退出"
        });
      }
    }
  }
};
</script>
<!-- scoped 原理 添加了一个属性 唯一值-->
<style lang="less" scoped>
.top-container {
  height: 100%;
  .el-row {
    h1 {
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .right {
      height: 60px;
      line-height: 60px;
      text-align: right;
      padding-right: 30px;
      a {
        color: green;
      }
    }
  }
}
.el-aside {
  background: #40a2c9;
}
.el-main {
  background: #fff;
}
</style>
