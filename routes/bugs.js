const express = require("express");
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
  res.status(200).send("Success");
});

module.exports = router;
