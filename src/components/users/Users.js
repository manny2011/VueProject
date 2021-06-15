
export default {
  name: "HelloWorld",
  created() {
    this.getData();
    this.getRolesData()
  },
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 1,
      searchText: "",
      addUserDialogVisible: false,
      editUserDialogVisible: false,
      assignRoleDialogVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      editUserForm: {
        name: 'baozi',
        email: 'xxx@11.com',
        mobile: '18888888888'
      },
      asignRoleForm: {
      },
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        email: [
          { pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: '格式不正确', trigger: 'blur' }
        ],
        mobile: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '格式不正确',
            trigger: 'blur',
          }
        ]
      },
      editUserFormRules: {

      },
      roleData: []
    };
  },
  methods: {
    changeCurPage(current) {
      console.log("click", current);
      this.getData(current); //this表示当前 vue对象
    },
    async getData(currentPage = 1) {
      try {
        //默认参数
        let res = await this.$axios
          .get("users", {
            params: {
              query: this.searchText,
              pagenum: currentPage,
              pagesize: this.pageSize
            },
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
        console.log(res);
        console.log(res.data.data.users);
        this.tableData = res.data.data.users;
        this.total = res.data.data.total;
        this.currentPage = res.data.data.pagenum;
      } catch (err) {
        console.log(err);
      }
    },
    addNewUser() {
      console.log("addNewUser");
      this.addUserDialogVisible = true
    },
    startSearch() {
      console.log("startSearch");
      this.getData(1);
    },
    addUser(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await axios
            .post('http://localhost:8888/api/private/v1/users', this.addUserForm, {
              headers: {
                Authorization: localStorage.getItem('token'),
              }
            });
          console.log(res);
          if (res.data.meta.status === 201) {
            this.tableData.push(res.data.data)
            this.addUserDialogVisible = false
            this.$message.error('提交成功！')
            this.$refs[formName].resetFields()
          } else {
            this.$message.error(res.data.meta.msg)
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    async delUser(row) {
      console.log('delUser', row);
      const { id } = row;
      try {//确认
        await this.$confirm("此操作将删除用户，是否继续？", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
        });
        let res = await this.$axios.delete(`users/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        console.log(res);
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'info',
            message: res.data.meta.msg,
          })
          this.getData()
        } else {
          this.$message({
            type: 'error',
            message: res.data.meta.msg,
          })
        }

      } catch (err) {//取消
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      }


    },
    async stateChanged(row) {
      const { id, mg_state } = row;
      try {
        let res = await this.$axios.put(`users/${id}/state/${mg_state}`, null, {
          headers: {
            Authorization: localStorage.getItem('token'),
          }
        })
        console.log(res);
      } catch (err) {
        console.log(err);
        row.mg_state = !row.mg_state
      }

    },
    async getRolesData() {
      let res = await this.$axios.get('roles')
      console.log(res);
      if (res.data.meta.status === 200) {
        this.roleData = res.data.data
      } else {

      }
      this.$message({
        message: res.data.meta.msg,
      })
    },
    editUser(row) {
      console.log(row);
      this.editUserForm = row
      this.editUserDialogVisible = true
    },
    cancelEditUser() {
      console.log('cancel');
      this.editUserForm = {}
      this.editUserDialogVisible = false
    },
    confirmEditUser(formName) {
      console.log('confirm');
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { email, mobile, id } = this.editUserForm
          let res = await this.$axios.put(`users/${id}`, {
            email,
            mobile
          })
          if (res.data.meta.status == 200) {
            this.editUserForm = {}
            this.editUserDialogVisible = false
            this.$refs[formName].resetFields()
            this.getData(this.currentPage)
          } else {
            this.$message({
              message: res.data.meta.msg,
              type: 'error'
            })
          }
        } else {
          this.$message.error('数据格式不正确！')
        }
      })

    },
    closeAddDialog(formName) {
      this.$refs[formName].resetFields()
    },
    closeEditDialog(formName) {
      this.$refs[formName].resetFields()
    },
    async assignRole(row) {
      console.log(row);
      const { id } = row
      let res = await this.$axios.get(`users/${id}`)
      console.log(res);
      const { rid, username } = res.data.data
      this.asignRoleForm.id = id
      this.asignRoleForm.username = username
      this.asignRoleForm.role_id = rid

      this.assignRoleDialogVisible = true

    },
    async confirmAsignRole() {
      const { id, role_id } = this.asignRoleForm
      let res = await this.$axios.put(`users/${id}/role`, {
        rid: role_id
      })
      if (res.data.meta.status === 200) {
        this.assignRoleDialogVisible = false
        this.$message({
          type:'success',
          msg:'分配角色成功!'
        })
      }
      console.log(res);
    }
  },
  computed: {
    // total: function() {
    // return this.tableData.length; //数组长度
    // }
  },

};
