<template lang="pug">
  div
    #user-img-container.float-left
      img.user-img(src="../assets/user.png", alt="user image")
    #user-form.float-left
      .col-md-6.col-sm12
        b-form(@submit="onSubmit")
          b-form-group(
            id="employeeNumberGroup",
            label="Employee #",
            label-for="employeeNumber"
          )
            b-form-input(
              :class="{'is-invalid': errors.has('employeeNumber') }"
              id="employeeNumber",
              name="employeeNumber",
              type="text",
              v-model="userModel.employeeNumber",
              v-validate="'required'",
              disabled
            )
            span.help.text-danger(v-show="errors.has('employeeNumber')") {{ errors.first('employeeNumber') }}
          b-form-group(
            id="firstNameGroup",
            label="First Name",
            label-for="firstName",
          )
            b-form-input(
              :class="{'is-invalid': errors.has('firstName') }"
              id="firstName",
              name="firstName",
              type="text",
              v-model="userModel.firstName",
              placeholder="First Name",
              v-validate="'required'",
              :disabled="isUserAdmin"
            )
            span.help.text-danger(v-show="errors.has('firstName')") {{ errors.first('firstName') }}
          b-form-group(
            id="lastNameGroup",
            label="Last Name",
            label-for="lastName"
          )
            b-form-input(
              :class="{'is-invalid': errors.has('lastName') }"
              id="lastName",
              name="lastName",
              type="text",
              v-model="userModel.lastName",
              placeholder="Last Name",
              v-validate="'required'",
              :disabled="isUserAdmin"
            )
            span.help.text-danger(v-show="errors.has('lastName')") {{ errors.first('lastName') }}
          b-form-group(
            id="startDateGroup",
            label="Start Date",
            label-for="startDate"
          )
            b-form-input(
              :class="{'is-invalid': errors.has('startDate') }"
              id="startDate",
              name="startDate",
              type="date",
              v-model="userModel.startDate",
              placeholder="Start Date",
              v-validate="'required'",
              :disabled="isUserAdmin"
            )
            span.help.text-danger(v-show="errors.has('startDate')") {{ errors.first('startDate') }}
          button.btn.btn-primary.btn-block(type="submit", :disabled="isUserAdmin") Save
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'User',
  data () {
    return {
      userModel: {}
    }
  },
  mounted () {
    this.userModel = this._.cloneDeep(this.user)
  },
  computed: {
    /**
     * True when user model is admin
     * @returns {boolean}
     */
    isUserAdmin () {
      return this.userModel.id === 'admin'
    },
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      isAdmin: 'user/isAdmin',
      user: 'user/getUser'
    })
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.$validator.validateAll().then((result) => {
        console.log(result)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #user-img-container {
    width: 250px;
  }
  .user-img {
    width: 200px;
    height: 200px;
  }
  #user-form {
    min-width: 400px;
    width: calc(100% - 250px);
  }
</style>
