// require('express-async-errors');
const config = require('config');
require('./startup/db')();
const Joi = require('joi');
const socketIo = require('socket.io');
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

const io = socketIo(server, {
  cors: { origin: '*' },
  perMessageDeflate: false,
});
let clients = {};
io.on('connection', (socket) => {
  socket.on('connection', function () {
    clients[socket.id] = socket;
    console.log('new client Connected');
  });

  socket.on('disconnect', function () {
    delete clients[socket.id];
  });
});
app.locals.io = io;

module.exports = server;
