const _ = require("lodash");
const { Team } = require("../models/team");

const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let team = await Team.findOne({ name: req.body.name });
  if (team) return res.status(400).send("Team already registered.");

  team = new Team(_.pick(req.body, ["name"]));

  await team.save();
});

module.exports = router;
