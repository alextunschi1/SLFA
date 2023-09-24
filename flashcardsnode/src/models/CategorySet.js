const mongoose = require("mongoose");
/**
 * Mongoose schema for a category set.
 */
const categorySetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const CategorySet =
  mongoose.models.CategorySet ||
  mongoose.model("CategorySet", categorySetSchema);
module.exports = CategorySet;