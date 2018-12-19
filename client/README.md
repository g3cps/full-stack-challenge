# full-stack-challenge

> A Vue.js project styled using Bootstrap-Vue. Backend API with Node, Express, and MongoDB + Mongoose.

## Notes And Assumptions To This Challenge

### Assumptions
* Reviewer is set when the employee is the supervisor of another employee.
* Only the Admin has the power to assign supervisor for employees.
* If an employee is deleted while being a reviewer of another employee, application should still work. Admin will have the power to assign another employee to become the reviewer.
* There are statuses for performance review (Incomplete and Completed). The reviewer will have the power to set it.
* Both reviewer and reviewee have the option to add feedbacks to a performance review, until the performance review is completed.
* Once a performance review is created, it cannot be deleted.
* Once a performance review is created, ratings cannot be changed. This is because if the reviewer is changed, it is not fair the employee if the new reviewer gives a new rating. New Reviewer can just create a new review instead.

### Notes
* Didn't do proper Auth, it is not specified as a requirement. Instead, frontend will "mock" logins.
* Admin cannot see or make changes to performance reviews. Only the reviewer and the reviewee have access to it.
* Didn't have time to make the app mobile friendly or make it WCAG accessible. I wanted to get as much functionality done as possible. (Sorry if the template is a bit messy)
* Used third party libraries for tables (vue-tables-2) and form validation (vee-validate).

## Version Dependencies
* Node: 10.6.0

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start
```

## API Setup

Inside `server` directory, run `npm i` to install dependencies.

At the root of the `server` directory, create a new file `.env` and follow `.env.example` to configure your connection to your Mongo database.
For the sake of this challenge, a `.env` will be included already.

After everything is installed and environment file is setup, run `npm start` to start the backend API.

Run `npm run seed` to seed a some users.

Run `npm run dropCollection` to drop the database and start fresh.
