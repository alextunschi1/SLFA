const promiseRouter = require("express-promise-router");
const {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("./controllers");

const router = promiseRouter();

router.post("/add_category", addCategory);
router.get("/get_category", getCategory);
router.post("/update_category", updateCategory);
router.post("/delete_category", deleteCategory);

module.exports = router;
