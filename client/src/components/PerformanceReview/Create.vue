<template lang="pug">
  div
    h1 Create Performance Review
    b-form.w-50(@submit="onSubmit")
      .row
        b-form-group.col-md-6.col-sm12(
          id="employeeGroup",
          label="Employee",
          label-for="employee",
        )
          b-form-select(
            :options="employees"
            :class="{'is-invalid': errors.has('employee') }"
            id="employee",
            name="employee",
            type="text",
            v-model="reviewModel.employee",
            v-validate="'required'",
            :disabled="isLoading"
          )
          span.help.text-danger(v-show="errors.has('employee')") {{ errors.first('employee') }}
        b-form-group.col-md-6.col-sm12(
          id="ratingGroup",
          label="Rating",
          label-for="rating"
        )
          star-rating(v-model="reviewModel.rating")
          <!--Hide this input to make star-rating work with validator-->
          b-form-input(
            :class="{'is-invalid': errors.has('rating') }"
            id="rating",
            name="rating",
            type="number",
            v-model="reviewModel.rating",
            v-validate="'required'",
            v-show="false"
          )
          span.help.text-danger(v-show="errors.has('rating')") {{ errors.first('rating') }}
      .row
        .col-md-12
          b-form-group(
            id="messageGroup",
            label="Message",
            label-for="message"
          )
            b-form-textarea(
              :class="{'is-invalid': errors.has('message') }"
              id="message",
              name="message",
              v-model="reviewModel.message",
              v-validate="'required'",
              :rows="4",
              :max-rows="4"
            )
            span.help.text-danger(v-show="errors.has('message')") {{ errors.first('message') }}
      .row
        .col-md-12
          button.btn.btn-primary.float-right(type="submit") Save
</template>

<script>
import {mapGetters} from 'vuex'
import EmployeeService from '../../services/EmployeeService'
import PerformanceReviewService from '../../services/PerformanceReviewService'
import StarRating from 'vue-star-rating'

// import Moment from 'moment'

export default {
  name: 'Create-Performance-Review',
  components: {
    StarRating
  },
  data () {
    return {
      reviewModel: {},
      employees: [],
      isLoading: true
    }
  },
  mounted () {
    this.reviewModel = {
      createdBy: this.user._id,
      reviewer: this.user._id
    }
    EmployeeService.fetchEmployees({supervisor: this.user._id, limit: 9999})
      .then(({data}) => {
        const options = this._.map(data.docs,
          user => ({value: user._id, text: `${user.employeeNumber} - ${user.firstName} ${user.lastName}`}))

        this.employees = options
      }).finally(() => {
        this.isLoading = false
      })
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      isAdmin: 'user/isAdmin',
      user: 'user/getUser'
    })
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          PerformanceReviewService.savePerformanceReview(this.reviewModel)
            .then(() => {
              this.$router.push({name: 'Performance Reviews'})
            })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
