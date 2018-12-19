require('dotenv').config();

const mongoose = require('mongoose');
const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB}`;

return mongoose.connect(url, {
  useNewUrlParser: true
}, () => {
  mongoose.connection.db.dropDatabase((err, result) => {
    if (err)
      console.log(err)
    else
      console.log('Finished dropping database');
    process.exit()
  });
});
