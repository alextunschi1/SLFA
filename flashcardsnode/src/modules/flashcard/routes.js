const promiseRouter = require("express-promise-router");
const {
  addFlashCard,
  getFlashCard,
  deleteFlashCard,
  updateFlashCard,
} = require("./controllers");

const router = promiseRouter();

router.post("/add_flashCard", addFlashCard);
router.get("/get_flashCard", getFlashCard);
router.post("/update_flashCard", updateFlashCard);
router.get("/delete_flashCard", deleteFlashCard);

module.exports = router;
