const CategoryBusiness = require("./business");

exports.addCategory = async function addCategory(req, res) {
  const body = req.body;
  const status = await CategoryBusiness.addCategory(body);
  if (status.success) return res.json(status);
  else return res.json(status);
};
exports.updateCategory = async function updateCategory(req, res) {
  const body = req.body;
  const status = await CategoryBusiness.updateCategory(body);
  if (status.success) return res.json(status);
  else return res.json(status);
};
exports.deleteCategory = async function deleteCategory(req, res) {
  const body = req.body;
  const status = await CategoryBusiness.deleteCategory(body);
  if (status.success) return res.json(status);
  else return res.json(status);
};
exports.getCategory = async function getCategory(req, res) {
  const body = req.query;
  const status = await CategoryBusiness.getCategory(body);
  if (status.success) return res.json(status);
  else return res.json(status);
};
