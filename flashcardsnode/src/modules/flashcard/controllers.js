const FlashCardBusiness = require("./business");

exports.addFlashCard = async function addFlashCard(req, res) {
  const body = req.body;
  const status = await FlashCardBusiness.addFlashCard(body);
  if (status.success) return res.json(status);
  else return res.json(status);
};
exports.updateFlashCard = async function updateFlashCard(req, res) {
  const body = req.body;
  const status = await FlashCardBusiness.updateFlashCard(body);
  if (status.success) return res.json(status);
  else return res.json(status);
};
exports.deleteFlashCard = async function deleteFlashCard(req, res) {
  const body = req.query;
  const status = await FlashCardBusiness.deleteFlashCard(body);
  if (status.success) return res.json(status);
  else return res.json(status);
};
exports.getFlashCard = async function getFlashCard(req, res) {
  const body = req.query;
  const status = await FlashCardBusiness.getFlashCard(body);
  if (status.success) return res.json(status);
  else return res.json(status);
};
