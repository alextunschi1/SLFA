const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const flashcardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: [answerSchema],
    validate: [
      (arr) => arr.length === 4,
      "Answers array must have exactly four items.",
    ],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User schema
    required: true,
  },
  categorySet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CategorySet", // Reference to the CategorySet schema
    required: true,
  },
});

const Flashcard =
  mongoose.models.Flashcard || mongoose.model("Flashcard", flashcardSchema);
module.exports = Flashcard;
