require('dotenv').config();

const mongoose = require('mongoose');
const faker = require('faker');

const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB}`;

mongoose.connect(url, {
  useNewUrlParser: true
});

const Employee = require('../models/employee');

/**
 * Seed an amount of employees. If a list of supervisor ids is provided, employees will be equally split to report to
 * @param title: Title for the employees
 * @param amount: Amount of employees to seed
 * @param supervisorIds: A list of supervisors
 */
const generateEmployees = (title = 'Manager', amount = 2, supervisorIds = []) => {
  const { length } = supervisorIds;
  let saves = [];
  for (let x = 0; x < amount; x++) {
    const data = new Employee({
      title,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      startDate: new Date(),
      supervisor: length ? supervisorIds[x % length] : undefined // assign supervisor based on index of the employee
    });
    saves.push(data.save());
  }
  return saves;
};

/**
 * Main seeder function
 */
const run = () =>
  // generate supervisors first
  Promise.all(generateEmployees())
    .then((values) => {
      const supervisorIds = values.map((employee) => employee._id);
      // now create some developers and assign a supervisors to each of them
      return Promise.all(generateEmployees('Developer', 10, supervisorIds));
    });

// run the seeder...
run()
  .then(() => mongoose.disconnect())
  .catch(e => console.log(e));

module.exports = run;
