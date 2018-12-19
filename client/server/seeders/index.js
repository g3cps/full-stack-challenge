const employeeSeeder = require('./employee');

// Chain seeders here
employeeSeeder()
  .then(() => {
    console.log('Finished Seeding');
  })
  .catch(console.log)
  .finally(process.exit);
