
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 1,
      searchText: "",
      addUserDialogVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
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
      }
    };
  },
  methods: {
    changeCurPage(current) {
      console.log("click", current);
      this.getData(current); //this表示当前 vue对象
    },
    async getData(currentPage = 1) {
      //默认参数
      let res = await axios
        .get("http://localhost:8888/api/private/v1/users", {
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
  },
  computed: {
    // total: function() {
    // return this.tableData.length; //数组长度
    // }
  },
  created() {
    this.getData();
  },
  mounted() { }
};
