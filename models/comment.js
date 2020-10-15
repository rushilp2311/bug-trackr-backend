const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: String,
  date: { type: Date, default: Date.now },
  createBy: Object,
});

exports.commnetSchema = commentSchema;
