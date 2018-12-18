// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import VueLodash from 'vue-lodash'
import VeeValidate from 'vee-validate'
import router from './router'
import VueRouterUserRoles from 'vue-router-user-roles'
import store from './stores'
import {ServerTable, Event} from 'vue-tables-2'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueLodash)
Vue.use(VeeValidate)
Vue.use(ServerTable)
Vue.use(Event)
Vue.use(VueRouterUserRoles, {router})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#index',
  router,
  store,
  components: { App },
  template: '<App/>'
})
