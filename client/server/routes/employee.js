const employeeController = require('./../controllers/employee.ctrl');

module.exports = (router) => {
  /**
   * get all employees
   */
  router
    .route('/employee')
    .get(employeeController.getAll);

  /**
   * get a single employee to view
   */
  router
    .route('/employee/:id')
    .get(employeeController.getEmployee);

  /**
   * create a new employee
   */
  router
    .route('/employee')
    .post(employeeController.create);

  /**
   * update a new employee
   */
  router
    .route('/employee/:id')
    .put(employeeController.update);

  /**
   * delete an employee
   */
  router
    .route('/employee/:id')
    .delete(employeeController.deleteEmployee);
};
