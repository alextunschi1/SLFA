const mongoose = require("mongoose");

const testScoreSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  score: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const TestScore =
  mongoose.models.TestScore || mongoose.model("TestScore", testScoreSchema);

module.exports = TestScore;