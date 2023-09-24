const promiseRouter = require("express-promise-router");
const { Quiz, allFlashCards } = require("./controllers");

const router = promiseRouter();

router.post("/quiz", Quiz);
router.get("/all_flashCards", allFlashCards);

module.exports = router;
