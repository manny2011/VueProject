/* eslint-disable*/
export default {
  created() {
    this.getCategories()
  },
  data() {
    return {
      currentStep: 0,
      activeName: 'first',
      form: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: [],
        ifDiscount: 1,
      },
      categoryData: [],
      cascaderProp: {
        label: 'cat_name',
        children: 'children',
        value: 'cat_id'
      },
      dialogImageUrl: '',
      dialogVisible: false,
      headers: {
        Authorization: localStorage.getItem('token'),

      }
    }
  },
  methods: {
    setCurrentStep(index) {
      this.currentStep = index
    },
    switchTab(tab) {
      console.log(tab);
      // if (tab.name === 'first') {//必须加this
      //   this.setCurrentStep(0)
      // } else if (tab.name === 'second') {
      //   this.setCurrentStep(1)
      // } else if (tab.name === 'third') {
      //   this.setCurrentStep(2)
      // }
      // '1'+1 = '11';
      // +'1' + 1 = 2;运算符操作中当作数字
      //parseInt(index)也可以
      this.setCurrentStep(+tab.index)
    },
    next(index, name) {
      this.currentStep = index
      this.activeName = name
    },
    async getCategories() {
      let res = await this.$axios.get('categories', {
        params: {
          type: 3,
        }
      })
      console.log(res);
      this.categoryData = res.data.data
    },
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file) {
      console.log(file);
    },
    handleSuccess(res, file, fileList) {
      console.log(res, file, fileList);
      this.form.pics.push({
        pic: res.data.tmp_path,
      })
    }
  },
}
