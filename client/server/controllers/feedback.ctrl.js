const Feedback = require('../models/feedback');

module.exports = {
  /**
   * Get a list of feedback. Newest first.
   * @param req
   * @param res
   * @param next
   */
  index: (req, res, next) => {
    Feedback.find({
      performanceReviewId: req.params.performanceReviewId
    })
      .populate('creator')
      .exec((err, feedbacks) => {
        if (err)
          res.send(err);
        else
          res.send(feedbacks);
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
