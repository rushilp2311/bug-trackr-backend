const mongoose = require("mongoose");
const { bugSchema } = require("./bug");

const teamSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, required: true, minlength: 5 },
  bugs: {
    type: [bugSchema],
  },
});

const Team = mongoose.model("Team", teamSchema);

exports.Team = Team;
