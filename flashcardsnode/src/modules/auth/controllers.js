const AuthBusiness = require("./business");

//****** REGISTERING *******//
exports.register = async function register(req, res) {
  const body = req.body;
  const status = await AuthBusiness.register(body);
  if (status.success) return res.json(status);
  else return res.json(status);
};
//****** SIGNIN *******//
exports.signIn = async function signIn(req, res) {
  const body = req.body;
  const status = await AuthBusiness.signIn(body);
  if (status.success) return res.json(status);
  else return res.json(status);
};
//****** CHANGEPASWORD *******//
exports.changePassword = async function changePassword(req, res) {
  const body = req.body;
  const status = await AuthBusiness.changePassword(body);
  if (status.success) return res.json(status);
  else return res.json(status);
};
