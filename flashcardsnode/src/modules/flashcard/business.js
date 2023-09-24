const CategorySet = require("../../models/CategorySet");
const Flashcard = require("../../models/FlashCard");
const User = require("../../models/User");

class FlashCardBusiness {
  // Add flashcard
  async addFlashCard(payload) {
    try {
      // Check if category already exists
      let user = await User.find({ email: payload.email });

      if (user.length === 0) {
        return {
          message: "User does not exists",
          success: false,
        };
      }
      // Check if category already exists
      let categorySet = await CategorySet.find({
        name: payload.categorySet,
        owner: user[0]._id,
      });

      // if category does not exists
      let FlashCardObj = {
        owner: user[0]._id,
        question: payload.question,
        answers: payload.answers,
        categorySet: categorySet[0]._id,
      };
      // save flash card in database
      let data = new Flashcard(FlashCardObj);

      let response = await data.save();
      return {
        message: "FlashCard created successfully",
        success: true,
        data: response,
      };
    } catch (error) {
      return { message: "Request failed", success: false, error };
    }
  }
  // Update flashcard
  async updateFlashCard(payload) {
    try {
      let upateFlascard = await Flashcard.updateOne(
        { _id: payload._id },
        { question: payload.question, answers: payload.answers }
      );
      return {
        message: "FlashCard updated successfully",
        success: true,
      };
    } catch (error) {
      return { message: "Request failed", success: false, error };
    }
  }

  // Delete flashcard
  async deleteFlashCard(payload) {
    try {
      let deleteFlashCard = await Flashcard.deleteOne({ _id: payload._id });
      return {
        message: "FlashCard deleted successfully",
        success: true,
      };
    } catch (error) {
      return { message: "Request failed", success: false, error };
    }
  }

  // Get flashcard
  async getFlashCard(email) {
    try {
      let user = await User.find({ email: email.email });

      if (user.length === 0) {
        return {
          message: "User not authorized",
          success: false,
        };
      }

      let data = await Flashcard.find({
        owner: user[0]._id,
        categorySet: email.categorySet,
      });
      return {
        message: "FlashCard fetched successfully",
        success: true,
        data: data,
      };
    } catch (error) {
      return {
        message: "Request failed",
        success: false,
        error,
      };
    }
  }
}

module.exports = new FlashCardBusiness();
