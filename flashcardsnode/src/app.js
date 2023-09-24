const express = require("express");
const requestLogger = require("morgan");
const cors = require("cors");
const path = require("path");
const AuthRouter = require("./modules/auth/routes");
const CategoryRouter = require("./modules/category/routes");
const FlashCardRouter = require("./modules/flashcard/routes");
const QuizRouter = require("./modules/quiz/routes");

const logger = require("../src/services/logger");

const app = express();

app.use(requestLogger("tiny"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());

/***** ROUTES */
app.use("/", AuthRouter);
app.use("/", CategoryRouter);
app.use("/", FlashCardRouter);
app.use("/", QuizRouter);

/***** ERROR HANDLING */

app.use(function (error, req, res, next) {
  // for debugging purposed, but I don't want it to run by default
  // if (config.ENVIRONMENT === 'test') {
  logger.error(error);
  // }
  next(error);
});

app.use(function (error, req, res, next) {
  if (!res.headersSent && error.statusCode) {
    res.status(error.statusCode).send({
      error: error,
    });
  } else {
    next(error);
  }
});

process.on("unhandledRejection", (error, promise) => {
  logger.error("🔥 -> Promise rejection here: ", promise);
  logger.error("🐞 -> The error was: ", error.toString());
});

process.on("uncaughtException", (error) => {
  console.log("THE ERROR===============", error);
  logger.error("🔥 -> something terrible happened: ", error);
  logger.error("🐞 -> The error was: ", error.toString());
  process.exit(1);
});

module.exports = app;
