<template lang="pug">
  div
    .col-md-12
      h1 Performance Review
      span Here you can find all your performance reviews, as a reviewer and a reviewee
    hr
    .col-md-12
      h2 Performance Review As Reviewer
      router-link(:to="{name: 'Create Performance Review'}")
        button.btn.btn-primary.mb-3 Create
      v-server-table(:columns="reviewerColumns", :options="reviwerOptions")
        template(slot="updatedAt", slot-scope="props")
          span {{formatDate(props.row.updatedAt)}}
        template(slot="employee", slot-scope="props")
          span {{props.row.employee.firstName}} {{props.row.employee.lastName}}
        template(slot="employee", slot-scope="props")
          span {{props.row.employee.firstName}} {{props.row.employee.lastName}}
        template(slot="view", slot-scope="props")
          button.btn.btn-primary(@click="viewReview(props.row._id)") View
    hr
    .col-md-12
      h2 Performance Review As Reviewee
      v-server-table(:columns="revieweeColumns", :options="reviweeOptions")
        template(slot="updatedAt", slot-scope="props")
          span {{formatDate(props.row.updatedAt)}}
        template(slot="createdBy", slot-scope="props")
          span {{props.row.createdBy.firstName}} {{props.row.createdBy.lastName}}
        template(slot="view", slot-scope="props")
          button.btn.btn-primary(@click="viewReview(props.row._id)") View
</template>

<script>
import {mapGetters} from 'vuex'
import PerformanceReview from '../../services/PerformanceReviewService'
import Moment from 'moment'

export default {
  name: 'Employees',
  data () {
    return {
      reviewerColumns: ['updatedAt', 'rating', 'status', 'employee', 'view'],
      revieweeColumns: ['updatedAt', 'rating', 'status', 'createdBy', 'view'],
      reviwerOptions: {
        filterByColumn: true,
        filterable: false,
        responseAdapter: ({data}) => {
          return {data: data.docs, count: data.totalDocs}
        },
        requestFunction: (params) => {
          const option = this.reviewsTableOption('reviewer', params)
          return PerformanceReview.fetchPerformanceReviews(option)
            .catch(function (e) {
              this.dispatch('error', e)
            }.bind(this))
        }
      },
      reviweeOptions: {
        filterByColumn: true,
        filterable: false,
        responseAdapter: ({data}) => {
          return {data: data.docs, count: data.totalDocs}
        },
        requestFunction: (params) => {
          const option = this.reviewsTableOption('reviewee', params)
          return PerformanceReview.fetchPerformanceReviews(option)
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
    reviewsTableOption (role, params) {
      const sortDir = params.ascending ? 'asc' : 'desc'
      const sortBy = params.orderBy || 'updatedAt'
      const {limit, page} = params

      if (role === 'reviewer') {
        params.query.reviewer = this.user._id
      } else if (role === 'reviewee') {
        params.query.employee = this.user._id
      }

      return ({
        sortDir,
        sortBy,
        limit,
        page,
        ...params.query
      })
    },
    viewReview (id) {
      this.$router.push({name: 'View Performance Review', params: {id}})
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
