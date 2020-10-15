const mongoose = require("mongoose");
const { commentSchema } = require("./comment");
const bugSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdBy: Object,
  date: { type: Date, default: Date.now },
  comments: { type: [commentSchema] },
  isOpen: Boolean,
});

exports.bugSchema = bugSchema;
