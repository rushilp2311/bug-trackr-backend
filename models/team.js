const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, required: true, minlength: 5 },
  users: {
    type: Array,
  },
});

async function addUserToTeam(id, user) {
  let team = await Team.findOne({ id: id });

  if (team) {
    team.users = [...team.users, user];
    team.save();
  } else {
    return "No Team found";
  }
}
const Team = mongoose.model("Team", teamSchema);

exports.Team = Team;
exports.AddUserToTeam = addUserToTeam;
