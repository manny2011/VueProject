import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/Home.vue'
import Login from '../components/Login.vue'
import Rights from '../components/Rights.vue'
import Roles from '../components/roles/Roles.vue'
import Users from '../components/users/Users.vue'
import Categories from '../components/Categories.vue'
import Goods from '../components/goods/goods.vue'
import addGood from '../components/goods/addGood.vue'

/* eslint-disable */
//eslint-disable-next-line
//@表示src的绝对路径 简写

//eslint-disable-next-line
Vue.use(Router)//在模块化工程中，必须 需要先安装一下路由功能！

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/users',
          name: 'users',
          component: Users,
        },
        {
          path: '/roles',
          name: 'roles',
          component: Roles,
        },
        {
          path: '/rights',
          name: 'rights',
          component: Rights,
        },
        {
          path:'/categories',
          name:'categories',
          component:Categories,
        },
        {
          path:'/goods',
          name:'goods',
          component:Goods,
        },
        {
          path:'/addGood',
          name:'addGood',
          component:addGood
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },

  ]
})
