const Employee = require('../models/employee');
const PerformanceReview = require('../models/performanceReview');
const Feedback = require('../models/feedback');

module.exports = {
  /**
   * Get single employee
   * @param req
   * @param res
   * @param next
   */
  getEmployee: (req, res, next) => {
    Employee.findById(req.params.id)
      .populate('supervisor')
      .exec((err, employee) => {
        if (err)
          res.send(err);
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

    if (query.employeeNumber) {
      transformedQuery.employeeNumber = query.employeeNumber;
    }
    if (query.supervisor) {
      transformedQuery.supervisor = query.supervisor;
    }
    if (query.title) {
      transformedQuery.title = {$regex: query.title, $options: 'i'};
    }
    if (query.firstName) {
      transformedQuery.firstName = {$regex: query.firstName, $options: 'i'};
    }
    if (query.lastName) {
      transformedQuery.lastName = {$regex: query.lastName, $options: 'i'};
    }

    let {limit, page, sortBy, sortDir} = query;
    if (!limit) {
      limit = 10;
    } else {
      limit = parseInt(limit, 0)
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
    const employee = new Employee(req.body);
    employee.save((err, employee) => {
        if (err)
          res.send(err);
        else
          res.send(employee);
        next();
      });
  },
  /**
   * Update employee
   * @param req
   * @param res
   * @param next
   */
  update: (req, res, next) => {
    Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true},
      (err, updated) => {
        // Update reviewer for all performance reviews if supervisor changed
        if (err) return res.statusCode(500).send(err);
        res.send(updated);
        next();
      }
    );
  },
  /**
   * Delete a current employee
   * @param req
   * @param res
   * @param next
   */
  deleteEmployee: (req, res, next) => {
    // Fix all relation with this employee, setting all to null
    const promises = [
      PerformanceReview.update({createdBy: req.params.id}, {createdBy: null}, {multi: true}),
      PerformanceReview.update({reviewer: req.params.id}, {reviewer: null}, {multi: true}),
      PerformanceReview.update({employee: req.params.id}, {employee: null}, {multi: true}),
      Employee.update({supervisor: req.params.id}, {supervisor: null}, {multi: true}),
      Feedback.update({creator: req.params.id}, {creator: null}, {multi: true}),
    ];
    Promise.all(promises)
      .then(() => {
        Employee.findOneAndRemove({_id: req.params.id}, function(err) {
          if (err)
            res.send(err);
          else
            res.sendStatus(200);
          next();
        });
      });
  }
};
