const _ = require('lodash');
const { Team } = require('../models/team');
const express = require('express');
const { User } = require('../models/user');
const router = express.Router();

//Adding team
router.post('/', async (req, res) => {
  let team = await Team.findOne({ id: req.body.id });
  if (team) return res.status(400).send('Team already registered.');
  team = new Team(_.pick(req.body, ['id', 'name', 'bugs']));
  await team.save();
  res.send(team);
});

//Getting the team through id
router.get('/:id', async (req, res) => {
  let team = await Team.findOne({ id: +req.params.id });
  if (!team) return res.status(404).send('Team Not Found');
  res.send(_.pick(team, ['id', 'name', 'bugs']));
});

//Get all the teams
router.get('/', async (req, res) => {
  let allTeams = await Team.find();
  res.send(allTeams);
});

router.delete('/:id', async (req, res) => {
  let allTeam = await Team.deleteOne({ id: +req.params.id });
  if (!allTeam) return res.status(400).send(error.details[0].message);

  res.send('Team Deleted').status(200);
});

module.exports = router;
