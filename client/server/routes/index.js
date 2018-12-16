// server/routes/index.js
const employee = require('./employee');
const performanceReview = require('./performanceReview');
const feedback = require('./feedback');

module.exports = (router) => {
  employee(router);
  performanceReview(router);
  feedback(router);
};
