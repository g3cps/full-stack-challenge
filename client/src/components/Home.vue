<template lang="pug">
  div
    h1 Welcome {{user.firstName}}!
    div(v-if="!isLoggedIn")
      h2 Please Login to Begin
    .mt-5(v-else)
      User

</template>

<script>
import {mapGetters} from 'vuex'
import EmployeeService from '../services/EmployeeService'
import User from './User'

export default {
  name: 'Home',
  components: {
    User
  },
  data () {
    return {
      employees: null
    }
  },
  mounted () {
    this.getEmployees()
    console.log(this.user)
  },
  computed: mapGetters({
    isLoggedIn: 'user/isLoggedIn',
    user: 'user/getUser'
  }),
  methods: {
    async getEmployees () {
      const response = await EmployeeService.fetchEmployees()
      this.employees = response.data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
