require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const createError = require('http-errors');
const { errorMsg } = require('./constants');

const app = express();

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to Mongo database..'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/users', require('./routes/users'));
app.use('/api/treasures', require('./routes/treasures'));

app.use((req, res, next) => {
  next(createError(404), errorMsg.invalidUrl);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  const errMessage = err.message || errorMsg.generalError;
  res.json({ errMessage });
});

module.exports = app;
