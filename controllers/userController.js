const { createUser } = require("../models/userModel");

const registerUser = async function (req, res, next) {
  try {
    const { first_name, last_name, username, password } = req.body;

    const password_hash = await bycrypt.hash(password, 10);

    res.user = await createUser({
      first_name,
      last_name,
      username,
      password_hash,
    });

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = registerUser;
