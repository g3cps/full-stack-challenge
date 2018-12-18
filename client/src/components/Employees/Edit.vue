<template lang="pug">
  div
    h1 {{isEdit ? 'Edit' : 'Create'}} Employee
    .row
      .col-md-12
        User(v-if="!isLoading", :user-prop="employee")
    .row
      .col-md-8
        hr
    .row
      .col-md-8.col-sm-12
        h2 Select Supervisor
        SupervisorAssignment(v-if="!isLoading", :user="employee")
</template>

<script>
import {mapGetters} from 'vuex'
import Moment from 'moment'
import User from '../User'
import SupervisorAssignment from '../SupervisorAssignment'
import EmployeeService from '../../services/EmployeeService'

export default {
  name: 'Employee-Edit',
  components: {
    User,
    SupervisorAssignment
  },
  props: ['id'],
  data () {
    return {
      isLoading: true,
      employee: null
    }
  },
  mounted () {
    EmployeeService.getEmployee(this.id)
      .then(({data}) => {
        data.startDate = new Moment(data.startDate).format('YYYY-MM-DD')
        this.employee = data
      })
      .finally(() => {
        this.isLoading = false
      })
  },
  computed: {
    isEdit () {
      return !!this.id
    },
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      user: 'user/getUser'
    })
  },
  methods: {
    formatDate (dateString) {
      return new Moment(dateString).format('YYYY-MM-DD')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
