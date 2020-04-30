import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/datav/index'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Index',
      name: 'Index',
      component: Index
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
