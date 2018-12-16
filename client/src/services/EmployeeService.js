import Api from './Api'

export default {
  fetchEmployees () {
    return Api().get('employees')
  }
}
