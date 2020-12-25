// require('express-async-errors');
const config = require('config');
require('./startup/db')();
const Joi = require('joi');
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const team = require('./routes/teams');
const bug = require('./routes/bugs');
const comment = require('./routes/comments');
const error = require('./middleware/error');
const express = require('express');
const app = express();
const cors = require('cors');
Joi.objectId = require('joi-objectid')(Joi);
require('./startup/prod')(app);
app.use(cors());

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/team', team);
app.use('/api/bug', bug);
app.use('/api/comment', comment);

app.use(error);

const port = process.env.PORT || 3001;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
