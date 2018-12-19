<template lang="pug">
  div
    div
      strong.mr-2 Current Supervisor:
      span {{user.supervisor ? user.supervisor.firstName + ' ' + user.supervisor.lastName + ', ' + user.supervisor.title : 'N/A'}}
      button.btn.btn-sm.btn-danger.ml-2(v-if="user.supervisor", @click="select()") Remove
    v-server-table(:columns="columns", :options="options")
      template(slot="select", slot-scope="props")
        button.btn.btn-primary(v-if="!user.supervisor || props.row._id !== user.supervisor._id", @click="select(props.row)") Select
        span(v-else) Selected
</template>

<script>
import {mapGetters} from 'vuex'
import EmployeeService from '../services/EmployeeService'

export default {
  name: 'Supervisor-Assignment',
  props: ['user'],
  data () {
    return {
      columns: ['employeeNumber', 'firstName', 'lastName', 'title', 'select'],
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
      isAdmin: 'user/isAdmin'
    })
  },
  methods: {
    select (supervisor) {
      let params = this._.cloneDeep(this.user)
      params.supervisor = supervisor ? supervisor._id : undefined
      EmployeeService.saveEmployee(params)
        .then(() => {
          params.supervisor = supervisor || undefined
          this.$emit('saved', params)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
