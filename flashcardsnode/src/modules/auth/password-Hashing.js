const argon2 = require("argon2");

//Convert to hash
exports.hashConverter = async function hashConverter(password) {
  let hashPassword;
  try {
    hashPassword = await argon2.hash(password);
  } catch (err) {
    return {
      success: false,
      message: "Internal server error",
    };
  }
  return hashPassword;
};

//Hash Password Compare
exports.compareHash = async function compareHash(inputpassword, dbpassword) {
  try {
    if (await argon2.verify(dbpassword, inputpassword)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return {
      success: false,
      message: "Internal server error",
    };
  }
};
