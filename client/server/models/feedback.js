const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

let FeedbackSchema = new mongoose.Schema(
  {
    performanceReviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PerformanceReview',
      required: true
    },
    message: {
      type: String,
      required: true
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    }
  }, {
    timestamps: true
  }
);

FeedbackSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Feedback', FeedbackSchema);
