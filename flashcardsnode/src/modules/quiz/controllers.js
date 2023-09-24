const QuizBusiness = require("./business");

exports.Quiz = async function Quiz(req, res) {
  const body = req.body;
  const status = await QuizBusiness.Quiz(body);
  if (status.success) return res.json(status);
  else return res.json(status);
};

exports.allFlashCards = async function allFlashCards(req, res) {
  const body = req.query;

  const status = await QuizBusiness.allFlashCards(body);
  if (status.success) return res.json(status);
  else return res.json(status);
};
