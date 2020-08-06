import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import Register from './components/Register'
import DisplayTable from './components/DisplayTable'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/billerList',
      name: 'DisplayTable',
      component: DisplayTable
    }
  ]
})