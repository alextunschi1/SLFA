const User = require("../../models/User");
const TestScore = require("../../models/Test");
const Flashcard = require("../../models/FlashCard");

class QuizBusiness {
  // Add Quiz scrore to database
  async Quiz(payload) {
    let findUser = await User.find({ email: payload.email });
    if (findUser.length === 0) {
      return {
        message: "User does not exists",
        success: false,
      };
    }
    let data = {
      user: payload.email,
      score: payload.score,
      time: payload.time,
    };
    let testScore = new TestScore(data);
    let response = await testScore.save();
    return {
      message: "Test submitted successfully",
      success: true,
      data: response,
    };
  }

  //Get all flashcards against one set
  async allFlashCards(payload) {
    try {
      let findUser = await User.find({ email: payload.email });
      if (findUser.length === 0) {
        return {
          message: "User does not exists",
          success: false,
        };
      }
      let flashCards = await Flashcard.find({
        owner: findUser[0]._id,
        categorySet: payload.categorySet,
      });
      return {
        message: "FlashCards fetched successfully",
        success: true,
        data: flashCards,
      };
    } catch (error) {
      return { message: "Request failed", success: false, error };
    }
  }
}

module.exports = new QuizBusiness();
