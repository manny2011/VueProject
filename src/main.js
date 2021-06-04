// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {//统一管控路由的地方 Route 
  let token = localStorage.getItem('token')
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

