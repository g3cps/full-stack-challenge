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
  }
}
