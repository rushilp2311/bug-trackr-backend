const mongoose = require("mongoose");
const { User } = require("../models/user");
const bugSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdBy: Object,
  date: { type: Date, default: Date.now },
  comments: Array,
  isOpen: Boolean,
});

exports.bugSchema = bugSchema;
