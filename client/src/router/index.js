import Vue from 'vue'
import Router from 'vue-router'
import store from '../stores'
import Home from '../components/Home'
import Employees from '../components/Employees/Employees'
import EmployeeEdit from '../components/Employees/Edit'
import PerformanceReviews from '../components/PerformanceReview/PerformanceReviews'
import CreatePerformanceReviews from '../components/PerformanceReview/Create'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      restrict: null,
      meta: { restrictAdmin: true, restrictLoggedIn: true, restrictGuest: true }
    }, {
      path: '/employee',
      name: 'Employees',
      component: Employees,
      meta: { restrictAdmin: true, restrictGuest: true }
    }, {
      path: '/employee/edit/:id?',
      name: 'Employee Edit',
      component: EmployeeEdit,
      props: true,
      meta: { restrictAdmin: true }
    }, {
      path: '/performanceReview',
      name: 'Performance Reviews',
      component: PerformanceReviews,
      props: true,
      meta: { restrictLoggedIn: true }
    }, {
      path: '/performanceReview/create',
      name: 'Create Performance Reviews',
      component: CreatePerformanceReviews,
      props: true,
      meta: { restrictLoggedIn: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAdmin = store.getters['user/isAdmin']
  const isLoggedIn = store.getters['user/isLoggedIn']
  const {restrictAdmin, restrictLoggedIn, restrictGuest} = to.meta

  if ((restrictGuest && !isLoggedIn) || (restrictLoggedIn && isLoggedIn) || (restrictAdmin && isAdmin)) {
    next()
  } else {
    // Redirect to home page if user does not have permission to view the page
    next({
      path: '/',
      query: {
        redirect: to.fullPath
      }
    })
  }
})

export default router
