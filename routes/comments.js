const express = require('express');
const { User } = require('../models/user');
const { Team } = require('../models/team');
const router = express.Router();

router.post('/', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send(error.details[0].message);
  let team = await Team.findOne({ id: req.body.teamid });
  if (!team) return res.status(400).send(error.details[0].message);
  let comment = {
    comment: req.body.comment,
    createdBy: { id: user._id, name: user.name },
  };
  let currentBug = team.bugs.find((obj) => obj._id == req.body.bugid);
  currentBug.comments = [...currentBug.comments, comment];
  team.save();
  const io = req.app.locals.io;
  io.emit('comment', { bug: currentBug, team: team });
  res.send(team);
});

router.delete('/', async (req, res) => {
  let team = await Team.findOne({ id: req.headers.teamid });
  if (!team) return res.status(400).send(error.details[0].message);
  let currentBug = team.bugs.find((obj) => obj._id == req.headers.bugid);
  // let currentComment = currentBug.comments.find(comment => comment._id == req.body.commentid);
  for (let i = 0; i < currentBug.comments.length; i++) {
    if (currentBug.comments[i]._id == req.headers.commentid) {
      currentBug.comments.splice(i, 1);
      break;
    }
  }
  const io = req.app.locals.io;
  team.save();
  io.emit('comment', { bug: currentBug, team: team });
  res.send(team);
});

module.exports = router;
