const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

let PerformanceReviewSchema = new mongoose.Schema(
  {
    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
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
