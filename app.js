const express = require('express');
const bodyParser = require('body-parser');
const mongooseErrorHandler = require('mongoose-error-handler');
const jsend = require('jsend');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(jsend.middleware);

require('./components/auth')(app);
// require('./components/core')(app);
require('./components/users')(app);
require('./components/books')(app);
require('./components/institutions')(app);

// Error handlers.
/* eslint no-param-reassign: "off", no-unused-vars: "off" */
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'MongoError') {
    err = mongooseErrorHandler.set(err);
    err.code = 422;
  }

  next(err);
});

app.use((err, req, res, next) => {
  const code = err.code || 500;

  if (code >= 500) { return res.jsend.error(err.message); }

  return res.jsend.fail(err);
});

module.exports = app;
