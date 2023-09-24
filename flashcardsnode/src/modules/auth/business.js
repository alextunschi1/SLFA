const UserModal = require("../../models/User");
const { hashConverter, compareHash } = require("./password-Hashing");

class AuthBusiness {
  //Register
  async register(data) {
    // Check if category already exists
    const existingEmail = await UserModal.findOne({ email: data.email });

    if (existingEmail) {
      return {
        success: false,
        message: "Email already exists",
      };
    }

    let passHash = await hashConverter(data.password); //hashing password before saving
    let object = new UserModal({
      email: data.email,
      name: data.name,
      password: passHash,
    });
    // save user in database
    let saveUser = await object.save();
    return {
      success: true,
      message: "Register succefully",
    };
  }

  //Sign-in
  async signIn(data) {
    // Check if category already exists
    const existingEmail = await UserModal.findOne({ email: data.email });

    if (!existingEmail) {
      return {
        success: false,
        message: "User not found",
      };
    }
    //comparing password with database
    let dbpassword = existingEmail.password;
    let comparePassword = await compareHash(data.password, dbpassword);

    // if password matches
    if (comparePassword) {
      let returnObject = {
        email: existingEmail.email,
        name: existingEmail.name,
      };

      return {
        success: true,
        message: "Sign in succefully",
        data: returnObject,
      };
    }
    // if password does not match
    return {
      success: false,
      message: "Invalid credentials",
    };
  }

  //Change password
  async changePassword(data) {
    // Check if category already exists
    let user = await UserModal.findOne({ email: data.email });
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }
    //comparing password with database
    let dbpassword = user.password;
    let comparePassword = await compareHash(data.password, dbpassword);
    if (comparePassword) {
      let passHash = await hashConverter(data.newPassword);
      // if password matches
      let updatePassword = await UserModal.updateOne(
        { email: data.email },
        { password: passHash }
      );
      return {
        success: true,
        message: "Password updated succefully",
      };
    } else {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }
  }
}

module.exports = new AuthBusiness();
