const express = require('express');
const app = express();
const api = require('./api/api');
const err = require('./middleware/err');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testDB', { useNewUrlParser: true });

require('./middleware/appMiddleware')(app);
app.use('/api', api);

app.use(err());

module.exports = app;


