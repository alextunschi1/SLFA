const promiseRouter = require("express-promise-router");
const { register, signIn, changePassword } = require("./controllers");

const router = promiseRouter();

router.post("/register", register);
router.post("/sign-in", signIn);
router.post("/change_password", changePassword);

module.exports = router;
