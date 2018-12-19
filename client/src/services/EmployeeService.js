import Api from './Api'

export default {
  fetchEmployees (params) {
    return Api().get('employee', {params})
  },
  getEmployee (id) {
    return Api().get(`employee/${id}`)
  },
  saveEmployee (params) {
    const method = params._id ? 'put' : 'post'
    const id = params._id
    return Api()[method](`employee${id ? '/' + id : ''}`, params)
  },
  deleteEmployee (id) {
    return Api().delete(`employee/${id}`)
  }
}
