const auth = require('../middleware/auth');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const { Team } = require('../models/team');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.team = 0;
  await user.save();
  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .header('access-control-expose-headers', 'x-auth-token')
    .send(_.pick(user, ['_id', 'name', 'email']));
});

router.post('/addtoteam', async (req, res) => {
  let user = await User.findOne({ email: req.body.currentUser.email });
  user.team = req.body.team;
  await user.save();
  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .header('access-control-expose-headers', 'x-auth-token')
    .send(_.pick(user, ['_id', 'name', 'email', 'team']));
});

router.post('/leaveteam', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  user.team = req.body.team;
  await user.save();
  res.send(user);
});

router.get('/getallusersbyteamid/:id', async (req, res) => {
  let users = await User.find({ team: +req.params.id }).select({
    name: 1,
    email: 1,
  });
  res.send(users);
});

module.exports = router;
