<template lang="pug">
  div
    h1 Welcome {{user.firstName}}!
    div(v-if="!isLoggedIn")
      h2 Please Login to Begin
    .mt-5(v-else-if="!isAdmin")
      User(:user-prop="this.user")

</template>

<script>
import {mapGetters} from 'vuex'
import User from './User'

export default {
  name: 'Home',
  components: {
    User
  },
  data () {
    return {
      employees: null,
      userModel: {}
    }
  },
  mounted () {
  },
  computed: mapGetters({
    isLoggedIn: 'user/isLoggedIn',
    user: 'user/getUser',
    isAdmin: 'user/isAdmin'
  }),
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
