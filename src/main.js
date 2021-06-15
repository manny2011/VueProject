// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css'
import axios from 'axios'

//1.全局配置
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'//baseURL
//2.全局引入
Vue.prototype.$axios = axios//加到原型对象上
//3.添加全局请求头
axios.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, err => {
  console.log(err);//do sth.
  return Promise.reject(err)
})
//4.响应拦截器/ 统一处理token失效问题
axios.interceptors.response.use(function (response) {
  console.log("response: correct->", response);
  if (response.data.meta.status === 401) {
    router.push({ name: 'login' })
  }
  return response
}, function (err) {
  console.log("response: err->", err);
  return Promise.reject(err)
})

Vue.config.productionTip = false

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {//统一管控路由的地方 Route
  let token = localStorage.getItem('token')
  console.log("token: " + token);
  if (token || to.name === 'login') {
    next()
  } else {
    next({ name: 'login' })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

