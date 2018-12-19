const PerformanceReview = require('../models/performanceReview');

module.exports = {
  /**
   * Get single performance review
   * @param req
   * @param res
   * @param next
   */
  get: (req, res, next) => {
    PerformanceReview.findById(req.params.id)
      .exec((err, performanceReview) => {
        if (err)
          res.send(err);
        else if (!performanceReview)
          res.sendStatus(404);
        else
          res.send(performanceReview);
        next();
      })
  },
  /**
   * Get all performance reviews, paginated
   * @param req
   * @param res
   * @param next
   */
  index: (req, res, next) => {
    let {query} = req;
    let transformedQuery = {};
    let sort = {};

    if (query.status) {
      transformedQuery.status = {$regex: query.status, $options: 'i'};
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

    const option = {
      page,
      limit,
      sort,
      populate: ['reviewer', 'employee', 'createdBy']
    };

    PerformanceReview
      .paginate(transformedQuery, option, (err, reviews) => {
        if (err)
          res.send(err);
        else
          res.send(reviews);
        next();
      });
  },
  /**
   * Create a new performance review
   * @param req
   * @param res
   * @param next
   */
  create: (req, res, next) => {
    req.body.status = 'Incomplete';
    const review = new PerformanceReview(req.body);
    review.save((err, review) => {
      if (err)
        res.send(err);
      else
        res.send(review);
      next();
    });
  },
  /**
   * Update an existing performance review
   * @param req
   * @param res
   * @param next
   */
  update: (req, res, next) => {
    PerformanceReview.findById(req.params.id, (err, review) => {
      if (err) {
        res.send(err);
        next();
      } else {
        review.set(req.body);
        review.save((err, updatedReview) => {
          if (err)
            res.send(err);
          else {
            res.send(updatedReview);
          }
          next();
        });
      }
    });
  },
  /**
   * Delete a performance review
   * @param req
   * @param res
   * @param next
   */
  delete: (req, res, next) => {
    PerformanceReview.findOneAndRemove({_id: req.params.id}, function(err) {
      if (err)
        res.send(err);
      else
        res.sendStatus(200);
      next();
    });
  }
};
