const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
  comment: String,
  date: { type: Date, default: Date.now },
  createBy: Object,
});
const bugSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdBy: Object,
  date: { type: Date, default: Date.now },
  comments: [commentSchema],
  isOpen: Boolean,
});

const teamSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, required: true, minlength: 5 },
  bugs: [bugSchema],
});

const Team = mongoose.model("Team", teamSchema);

exports.Team = Team;
