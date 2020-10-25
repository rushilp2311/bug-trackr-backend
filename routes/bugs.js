const express = require("express");
const _ = require("lodash");
const { Team } = require("../models/team");
const { User } = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send(error.details[0].message);
  let team = await Team.findOne({ id: req.body.teamid });
  if (!team) return res.status(400).send(error.details[0].message);
  let bug = {
    title: req.body.title,
    description: req.body.description,
    createdBy: { id: user._id, name: user.name },
    isOpen: req.body.isOpen,
  };
  team.bugs.push(bug);
  await team.save();
  res.send(team);
});

router.delete("/", async (req, res) => { 
  let team = await Team.findOne({ id: req.headers.teamid });
  for (let i = 0; i < team.bugs.length; i++) {
    if (team.bugs[i]._id == req.headers.bugid) {     
      team.bugs.splice(i, 1);
      break;
    }
  }
  await team.save();
  res.send(team);
});

router.post("/changeBugStatus", async (req, res) => { 
  let team = await Team.findOne({ id: req.body.teamid });
  let currentBug = team.bugs.find(obj => obj._id == req.body.bugid);
  currentBug.isOpen = !currentBug.isOpen;
  team.save();
  res.send(team);
})


module.exports = router;
