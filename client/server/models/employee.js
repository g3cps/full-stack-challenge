const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongoosePaginate = require('mongoose-paginate-v2');

let EmployeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    },
  }
);

EmployeeSchema.plugin(AutoIncrement, {inc_field: 'employeeNumber'});
EmployeeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Employee', EmployeeSchema);
