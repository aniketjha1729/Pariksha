const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  ans: {
    type: String,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Question = mongoose.model("questions", questionSchema);
