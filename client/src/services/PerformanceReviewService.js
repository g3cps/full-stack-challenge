import Api from './Api'

/**
 * A small little helper function hack to resolve deleted users
 * @param data
 * @param list
 */
const resolveDeletedUser = (data, list = []) => {
  list.forEach((type) => {
    if (data[type] === null) {
      data[type] = {
        employeeNumber: -1,
        firstName: 'Deleted User',
        lastName: '',
        title: ''
      }
    }
  })
}

export default {
  fetchPerformanceReviews (params) {
    return Api().get('performanceReview', {params})
      .then((res) => {
        res.data.docs.forEach((doc) => {
          resolveDeletedUser(doc, ['createdBy', 'employee', 'reviewer'])
        })
        return res
      })
  },
  getPerformanceReview (id) {
    return Api().get(`performanceReview/${id}`)
      .then((res) => {
        resolveDeletedUser(res.data, ['createdBy', 'employee', 'reviewer'])
        return res
      })
  },
  savePerformanceReview (params) {
    return Api().post('performanceReview', params)
  },
  setPerformanceReviewStatus (id, status) {
    return Api().put(`performanceReview/${id}`, {status})
  },
  getFeedback (reviewId, params) {
    return Api().get(`feedback/${reviewId}`, params)
      .then((res) => {
        res.data.forEach((feedback) => {
          resolveDeletedUser(feedback, ['creator'])
        })
        return res
      })
  },
  submitFeedback (params) {
    return Api().post('feedback', params)
  }
}
