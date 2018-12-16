require('dotenv').load();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes/');

const router = express.Router();
const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB}`;

const app = express();
const port = process.env.PORT || 8081;

routes(router);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

/** connect to MongoDB datastore */
try {
  mongoose.connect(url, {
    useNewUrlParser: true
  });
} catch (error) {
  console.log(error);
}

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
