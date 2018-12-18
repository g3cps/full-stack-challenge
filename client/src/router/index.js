import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Employees from '../components/Employees/Employees'
import EmployeeEdit from '../components/Employees/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/employee',
      name: 'Employees',
      component: Employees
    }, {
      path: '/employee/edit/:id?',
      name: 'Employee Edit',
      component: EmployeeEdit,
      props: true
    }
  ]
})
