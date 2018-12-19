<template lang="pug">
  div
    .col-md-12
      h1 Employees
      v-server-table(:columns="columns", :options="options")
        template(slot="filter__view")
          button.btn.btn-primary(v-if="isAdmin", @click="viewEmployee({id: undefined})") Create
        template(slot="startDate", slot-scope="props")
          span {{formatDate(props.row.startDate)}}
        template(slot="view", slot-scope="props")
          button.btn.btn-primary(v-if="isAdmin", @click="viewEmployee({id: props.row._id})") View
          button.btn.btn-primary(v-if="!isLoggedIn", @click="loginAs(props.row)") Login As
</template>

<script>
import {mapGetters} from 'vuex'
import EmployeeService from '../../services/EmployeeService'
import Moment from 'moment'

export default {
  name: 'Employees',
  data () {
    return {
      columns: ['employeeNumber', 'firstName', 'lastName', 'startDate', 'title', 'view'],
      options: {
        filterByColumn: true,
        filterable: ['employeeNumber', 'firstName', 'lastName', 'title'],
        responseAdapter: ({data}) => {
          return {data: data.docs, count: data.totalDocs}
        },
        requestFunction: (params) => {
          const sortDir = params.ascending ? 'asc' : 'desc'
          const sortBy = params.orderBy || 'employeeNumber'
          const {limit, page} = params

          return EmployeeService.fetchEmployees({
            sortDir,
            sortBy,
            limit,
            page,
            ...params.query
          })
            .catch(function (e) {
              this.dispatch('error', e)
            }.bind(this))
        }
      }
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      user: 'user/getUser',
      isAdmin: 'user/isAdmin'
    })
  },
  methods: {
    viewEmployee (params = {}) {
      this.$router.push({name: 'Employee Edit', params})
    },
    loginAs (userData) {
      this.$store.commit({
        type: 'user/login',
        userData
      })
      this.$router.push({name: 'Home'})
    },
    formatDate (date) {
      return new Moment(date).format('YYYY-MM-DD')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
