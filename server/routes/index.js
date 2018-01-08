'use strict';

const app = require('express').Router();

app.use('/app', require('./app'));
app.get('/test3', (req, res) => {
  res.send('cccccc');
});

module.exports = app;