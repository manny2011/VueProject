
/* eslint-disable*/
export default {
  created() {
    this.getMenus()
    this.handleRoute()
  },
  data() {
    return {
      menuData: []
    }
  },
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
    },
    async getMenus() {
      let res = await this.$axios.get('menus')
      console.log(res);
      this.menuData = res.data.data
    },
    handleRoute(){
      //slice() 方法可从已有的数组中返回选定的元素
      return this.$router.path.slice(1)
    }
  }
};
