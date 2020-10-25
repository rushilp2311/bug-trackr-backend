const _ = require('lodash');
const { Team } = require('../models/team');
const express = require('express');
const { User } = require('../models/user');
const router = express.Router();

//Adding team
router.post('/', async (req, res) => {
  let team = await Team.findOne({ id: req.body.id });
  Team.findById;
  if (team) return res.status(400).send('Team already registered.');
  team = new Team(_.pick(req.body, ['id', 'name', 'bugs']));
  await team.save();
});

//Getting the team through id
router.get('/:id', async (req, res) => {
  let team = await Team.findOne({ id: +req.params.id });
  if (!team) return res.status(404).send('Team Not Found');

  res.send(_.pick(team, ['id', 'name', 'bugs']));
});

module.exports = router;
