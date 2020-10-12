const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, required: true, minlength: 5 },
  bugs: {
    type: Array,
  },
});

const Team = mongoose.model("Team", teamSchema);

exports.Team = Team;
