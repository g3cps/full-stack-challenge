import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Employees from '../components/Employees/Employees'
import EmployeeEdit from '../components/Employees/Edit'
import store from '../stores'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      restrict: null
    }, {
      path: '/employee',
      name: 'Employees',
      component: Employees,
      meta: { restrictAdmin: true }
    }, {
      path: '/employee/edit/:id?',
      name: 'Employee Edit',
      component: EmployeeEdit,
      props: true,
      meta: { restrictAdmin: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAdmin = store.getters['user/isAdmin']
  const isLoggedIn = store.getters['user/isLoggedIn']
  const {restrictAdmin, restrictLoggedIn} = to.meta

  // Redirect to home page if user does not have permission to view the page
  if ((restrictAdmin && !isAdmin) || (restrictLoggedIn && !isLoggedIn)) {
    next({
      path: '/',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})

export default router
