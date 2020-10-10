const _ = require("lodash");
const { Team } = require("../models/team");

const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//Adding team
router.post("/", async (req, res) => {
  let team = await Team.findOne({ id: req.body.id });
  if (team) return res.status(400).send("Team already registered.");

  team = new Team(_.pick(req.body, ["id", "name", "users", "bugs"]));
  await team.save();
});

//Getting the team through id
router.get("/:id", async (req, res) => {
  let team = await Team.findOne({ id: +req.params.id });
  console.log(team);
  if (!team) return res.status(404).send("Team Not Found");
  res.send(_.pick(team, ["id", "name", "users", "bugs"]));
});

module.exports = router;
