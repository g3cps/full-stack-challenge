const feedbackController = require('./../controllers/feedback.ctrl');

module.exports = (router) => {
  /**
   * get all feedback for a performance review
   */
  router
    .route('/feedback/:performanceReviewId')
    .get(feedbackController.index);

  /**
   * create a new feedback
   */
  router
    .route('/feedback')
    .post(feedbackController.create);

};
