const Feedback = require('../models/feedback');

module.exports = {
  /**
   * Get a list of feedback. Newest first, 5 on each page.
   * @param req
   * @param res
   * @param next
   */
  index: (req, res, next) => {
    const performanceReviewId = req.params.performanceReviewId;

    let {page} = req.query;
    if (!page) {
      page = 1;
    }

    const limit = 5;
    const sort = {
      createdAt: 'desc'
    };

    Feedback
      .paginate({performanceReviewId}, {page, limit, sort}, (err, reviews) => {
        if (err)
          res.send(err);
        else
          res.send(reviews);
        next();
      });
  },
  /**
   * Create a new feedback
   * @param req
   * @param res
   * @param next
   */
  create: (req, res, next) => {
    const review = new Feedback(req.body);
    review.save((err, review) => {
      if (err)
        res.send(err);
      else
        res.send(review);
      next();
    });
  }
};
