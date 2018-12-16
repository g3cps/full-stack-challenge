const performanceReviewController = require('./../controllers/performanceReview.ctrl');

module.exports = (router) => {
  /**
   * get all performance reviews
   */
  router
    .route('/performanceReview')
    .get(performanceReviewController.index);

  /**
   * get a single performance review
   */
  router
    .route('/performanceReview/:id')
    .get(performanceReviewController.get);

  /**
   * create a new performance review
   */
  router
    .route('/performanceReview')
    .post(performanceReviewController.create);

  /**
   * Update a performance review
   */
  router
    .route('/performanceReview/:id')
    .put(performanceReviewController.update);

  /**
   * delete a performance review
   */
  router
    .route('/performanceReview/:id')
    .delete(performanceReviewController.delete);
};
