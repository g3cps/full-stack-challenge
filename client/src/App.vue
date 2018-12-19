<template lang="pug">
  #index
    #side-nav
      #nav-user.mt-5.mb-5
        .col-md-12(v-if="!isLoggedIn")
          button.btn.btn-primary.btn-sm.mr-3(@click="login('admin')") Login as Admin
          button.btn.btn-primary.btn-sm(@click="login('employee')") Login as Employee
        .col-md-12(v-else)
          img.user-img(src="./assets/user.png", alt="user image")
          div
            span.ml-2 {{user.firstName}} {{user.lastName}}
          div.mt-2
            button.btn.btn-primary(@click="login()") Logout
      hr
      ul.nav.flex-column(v-if="isLoggedIn")
        li.nav-item
          router-link.nav-link(:to="{name: 'Home'}") My Profile
        li.nav-item
          router-link.nav-link(v-if="isAdmin", :to="{name: 'Employees'}") Manage Employees
        li.nav-item
          router-link.nav-link(:to="{name: 'Performance Reviews'}") Performance Reviews
    #main.pt-5
      router-view
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  computed: mapGetters({
    isLoggedIn: 'user/isLoggedIn',
    isAdmin: 'user/isAdmin',
    user: 'user/getUser'
  }),
  methods: {
    /**
     * Login user based on user type. For simplicity, no actual login request is sent to the API.
     * If user wanted to login as an employee, app will redirect to employee list view where you can select any employee
     * to login as.
     * @param type
     */
    login (type) {
      switch (type) {
        case ('admin'):
          // Login as a admin user
          this.$store.commit({
            type: 'user/login',
            userData: {
              _id: 'admin',
              firstName: 'Admin',
              lastName: 'User'
            }
          })
          break
        case ('employee'):
          this.$router.push({name: 'Employees'})
          // go to list view and select employee to login
          break
        default:
          this.$router.push({name: 'Home'})
          this.$store.commit({
            type: 'user/logout'
          })
      }
    }
  }
}
</script>

<style lang="scss">
  #index {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  #side-nav {
    width: 300px;
    float: left;
    height: 100vh;
    background-color: paleturquoise;
    position: fixed;
    text-align: center;
  }
  #main {
    width: calc(100% - 310px);
    margin-left: 310px;
  }
  .user-img {
    width: 75px;
  }
</style>
