import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login'
import Register from './components/Register'
import DisplayTable from './components/DisplayTable'
import Dashboard from './components/Dashboard'
import store from './store.js'
import AddInvoice from './components/AddInvoice'
import InvoiceForm from './components/InvoiceForm'
import Channel from './components/Channel'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/addInvoice',
          component: AddInvoice
        },
        {
          path: '/invoiceForm',
          component: InvoiceForm
        },
        {
          path: '/channel',
          component: Channel
        }
      ]
    },
    {
      path: '/billerList',
      name: 'DisplayTable',
      component: DisplayTable,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/update',
      name: 'register',
      component: Register,
      meta: {
        requiresAuth: true
      }
    },

  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})
export default router;