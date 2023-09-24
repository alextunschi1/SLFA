const CategorySet = require("../../models/CategorySet");
const Flashcard = require("../../models/FlashCard");
const User = require("../../models/User");

class CategoryBusiness {
  // Add category
  async addCategory(payload) {
    try {
      // Check if category already exists
      let user = await User.find({ email: payload.owner });
      if (user.length === 0) {
        return {
          message: "User does not exists",
          success: false,
        };
      }

      let categoryObj = {
        owner: user[0]._id,
        name: payload.name,
      };
      //Crating new category
      let data = new CategorySet(categoryObj);
      let reponse = await data.save();
      return {
        message: "Category created successfully",
        success: true,
        data: reponse,
      };
    } catch (error) {
      return { message: "Request failed", success: false };
    }
  }

  // Update category
  async updateCategory(payload) {
    // Check if category already exists
    let category = await CategorySet.find({ _id: payload._id });

    if (category.length === 0) {
      return {
        message: "Category does not exists",
        success: false,
      };
    }
    // Update category
    let data = await CategorySet.updateOne(
      { _id: payload._id },
      { name: payload.name }
    );
    return {
      message: "Category updated successfully",
      success: true,
    };
  }

  // Delete category
  async deleteCategory(payload) {
    // Check if category already exists
    let category = await CategorySet.find({ _id: payload._id });
    if (category.length === 0) {
      return {
        message: "Category does not exists",
        success: false,
      };
    }
    // Delete category
    let deleteCategory = await CategorySet.deleteOne({ _id: payload._id });
    // Delete flashcards against category
    let deleteFlashCards = await Flashcard.deleteMany({
      categorySet: payload._id,
    });
    return {
      message: "Category deleted successfully",
      success: true,
    };
  }

  // Get category
  async getCategory(email) {
    try {
      // Check if category already exists
      let user = await User.find({ email: email.email });

      if (user.length === 0) {
        return {
          message: "User not authorized",
          success: false,
        };
      }
      // Get category against user
      let data = await CategorySet.find({ owner: user[0]._id });
      let categoryDataWithCounts = [];

      // Get flashcard count against category
      for (let i = 0; i < data.length; i++) {
        let flashCardCount = await Flashcard.find({
          owner: user[0]._id,
          categorySet: data[i]._id,
        }).countDocuments();

        // Add flashcard count to category data
        let categoryDataWithCount = {
          _id: data[i]._id,
          name: data[i].name,
          flashcardCount: flashCardCount,
        };

        categoryDataWithCounts.push(categoryDataWithCount);
      }
      return {
        message: "Category fetched successfully",
        success: true,
        data: categoryDataWithCounts,
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

module.exports = new CategoryBusiness();
