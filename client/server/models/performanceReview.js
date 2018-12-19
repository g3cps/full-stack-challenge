const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

let PerformanceReviewSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['Incomplete', 'Completed']
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    message: String
  }, {
    timestamps: true
  }
);

PerformanceReviewSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('PerformanceReview', PerformanceReviewSchema);
