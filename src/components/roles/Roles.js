export default {
  created() {
    this.getData()
    this.getAllRightsData()
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      permissionDialogVisible: false,
      tableData: [

      ],
      form: {

      },
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    };
  },
  methods: {
    async getData() {
      let res = await this.$axios.get('roles')
      if (res.data.meta.status === 200) {
        this.tableData = res.data.data
      }
      console.log(res);
    },
    async getAllRightsData() {
      let res = await this.$axios.get('rights/tree')
      if (res.data.meta.status === 200) {
        this.data = res.data.data
      }
      console.log(res);
    },
    showRevisePermissions(row) {
      console.log('Permission dialog', row)
      this.roleId = row.id
      this.permissionDialogVisible = true
      let checkedArr = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            console.log(item3);
            checkedArr.push(item3.id)
          })
        })
      })
      console.log(checkedArr);
      // this.$refs['tree'].setCheckedNodes(checkedArr)
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(checkedArr)
      })
    },
    async assignPermission() {
      let checkKeys = this.$refs.tree.getCheckedKeys()
      let halfCheckKeys = this.$refs.tree.getHalfCheckedKeys()
      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: checkKeys.join(','),
      })
      console.log(res);
      if (res.data.meta.status === 200) {
        this.permissionDialogVisible = false
        this.$refs.tree.setCheckedKeys([])//清空选中
        this.$message({
          message: res.data.meta.msg,
          type: 'success'
        })
      } else {
        this.$message({
          type: 'error',
          message: res.data.meta.msg
        })
      }
    },
    closeDialog() {
      this.permissionDialogVisible = false
      this.$refs.tree.setCheckedKeys([])//清空
    }
  }
};
