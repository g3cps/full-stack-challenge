import Api from './Api'

export default {
  fetchPerformanceReviews (params) {
    return Api().get('performanceReview', {params})
  },
  getPerformanceReview (id) {
    return Api().get(`performanceReview/${id}`)
  },
  savePerformanceReview (params) {
    return Api().post('performanceReview', params)
  },
  setPerformanceReviewStatus (id, status) {
    return Api().put(`performanceReview/${id}`, {status})
  },
  getFeedback (reviewId, params) {
    return Api().get(`feedback/${reviewId}`, params)
  },
  submitFeedback (params) {
    return Api().post('feedback', params)
  }
}
