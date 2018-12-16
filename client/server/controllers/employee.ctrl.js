const Employee = require('../models/employee');

module.exports = {
  /**
   * Get single employee
   * @param req
   * @param res
   * @param next
   */
  getEmployee: (req, res, next) => {
    Employee.findById(req.params.id)
      .exec((err, employee) => {
        if (err)
          res.send(err);
        else if (!employee)
          res.send(404);
        else
          res.send(employee);
        next();
      })
  },
  /**
   * Get all employees
   * @param req
   * @param res
   * @param next
   */
  getAll: (req, res, next) => {
    let {query} = req;
    let transformedQuery = {};
    let sort = {};

    if (req.url !== '/employee') {
      if (query.firstName && query.firstName.length) {
        transformedQuery.firstName = {$regex: query.firstName, $options: 'i'};
      }
      if (query.lastName && query.lastName.length) {
        transformedQuery.lastName = {$regex: query.LastName, $options: 'i'};
      }
    }

    let {limit, page, sortBy, sortDir} = query;
    if (!limit) {
      limit = 10;
    }
    if (!page) {
      page = 1;
    }
    if (sortBy && sortDir) {
      sort[sortBy] = sortDir;
    }

    Employee
      .paginate(transformedQuery, {page, limit, sort}, (err, employees) => {
        if (err)
          res.send(err);
        else if (!employees)
          res.send(404);
        else
          res.send(employees);
        next();
      });
  },
  /**
   * Create a new employee
   * @param req
   * @param res
   * @param next
   */
  create: (req, res, next) => {
    const {firstName, lastName, startDate, supervisorId} = req.body;
    const employee = new Employee({firstName, lastName, startDate, supervisorId});
    employee.save((err, employee) => {
        if (err)
          res.send(err);
        else
          res.send(employee);
        next();
      });
  },
  /**
   * Delete a current employee
   * @param req
   * @param res
   * @param next
   */
  deleteEmployee: (req, res, next) => {
    Employee.findOneAndRemove({_id: req.params.id}, function(err) {
      if (err)
        res.send(err);
      else
        res.sendStatus(200);
      next();
    });
  }
};
