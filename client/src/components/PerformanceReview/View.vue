<template lang="pug">
  div
    h1 Your Performance Review
    .w-50.mb-3(v-if="!isLoading")
      .row
        .col-md-8.col-sm-12
          .small Created by: {{reviewModel.createdBy.firstName}} {{reviewModel.createdBy.lastName}}, {{reviewModel.createdBy.title}}
          .small Reviewer: {{reviewModel.reviewer.firstName}} {{reviewModel.reviewer.lastName}}, {{reviewModel.reviewer.title}}
          .small Reviewee: {{reviewModel.employee.firstName}} {{reviewModel.employee.lastName}}, {{reviewModel.employee.title}}
          <!--only reviewer can change the status of a performance review-->
          b-form-group.mt-2(
          v-if="user._id === reviewModel.reviewer._id"
          id="statusGroup",
          label="Status",
          label-for="status",
          )
            b-form-select(
            :options="['Incomplete', 'Completed']"
            id="status",
            name="status",
            type="text",
            v-model="reviewModel.status",
            v-validate="'required'",
            :disabled="isLoading",
            @change="(e) => changeStatus(e)"
            )
        .col-md-4.col-sm-12
          star-rating(v-model="reviewModel.rating", :read-only="true", :star-size="30")
      .row.mt-3
        .col-md-8.col-sm-12
          span {{reviewModel.message}}
      .row
        .col-md-8.col-sm-12
          span.font-italic.float-right - {{reviewModel.createdBy.firstName}} {{reviewModel.createdBy.lastName}}
    hr
    .w-50
      #feedback-messages(v-if="messages.length")
        .feedback-message.clearfix(v-for="feedback in messages")
          div
            img.user-img(src="../../assets/user.png", alt="user image")
            span {{feedback.creator.firstName}} {{feedback.creator.lastName}}
            br
            span.small {{formatDate(feedback.createdAt)}}
          div
            span {{feedback.message}}
          hr
    b-form.w-50(@submit="onSubmit", v-if="reviewModel.status === 'Incomplete'")
      .row
        .col-md-12
          b-form-group(
            id="messageGroup"
          )
            b-form-textarea(
              id="message",
              name="message",
              v-model="messageInput",
              v-validate="'required'",
              :rows="4",
              :max-rows="4",
              placeholder="Enter Feedback"
            )
      .row
        .col-md-12
          button.btn.btn-primary.float-right(type="submit") Send
    .w-50.text-center(v-else)
      span.font-italic - Performance review completed, feedback is now closed -
</template>

<script>
import {mapGetters} from 'vuex'
import PerformanceReviewService from '../../services/PerformanceReviewService'
import StarRating from 'vue-star-rating'
import Moment from 'moment'

export default {
  name: 'View-Performance-Review',
  props: ['id'],
  components: {
    StarRating
  },
  data () {
    return {
      reviewModel: {},
      messages: [],
      messageInput: '',
      isLoading: true
    }
  },
  mounted () {
    PerformanceReviewService.getPerformanceReview(this.id)
      .then(({data}) => {
        this.reviewModel = data
      })
      .finally(() => {
        this.isLoading = false
      })
    PerformanceReviewService.getFeedback(this.id)
      .then(({data}) => {
        this.messages = data
      })
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  },
  methods: {
    /**
     * Change status of performance review (Incomplete or Completed)
     * @param status
     */
    changeStatus (status) {
      PerformanceReviewService.setPerformanceReviewStatus(this.id, status)
        .then(({data}) => {
          this.reviewModel.status = status
        })
    },
    formatDate (date) {
      return new Moment(date).format('YYYY-MM-DD HH:mm')
    },
    onSubmit (e) {
      e.preventDefault()
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          PerformanceReviewService.submitFeedback({
            performanceReviewId: this.id,
            message: this.messageInput,
            creator: this.user._id
          }).then(({data}) => {
            data.creator = this.user
            this.messages.push(data)
            this.messageInput = ''
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .user-img {
    width: 18px;
  }
</style>
