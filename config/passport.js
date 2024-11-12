const bycrypt = require("bcryptjs");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { getUser, getUserById } = require("../database/queries");

const loginCallback = async function (username, password, done) {
  try {
    const user = await getUser(username);
    if (!user) {
      return done(null, false, {
        message: `username ${username} doesn't exist`,
      });
    }

    const match = bycrypt.compare(password, user.password_hash);

    if (match) {
      return done(null, user);
    }

    return done(null, false, { message: "Incorrect password" });
  } catch (error) {
    return done(error);
  }
};

const loginStrategy = new localStrategy(loginCallback);

passport.use("login-local", loginStrategy);

// CB function assigns user.id to the session when passport authenticates
passport.serializeUser((user, done) => {
  done(null, user.user_id);
});
// Once authenticated CB function assigns req.user on every request
passport.deserializeUser((userId, done) => {
  getUserById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => done(error));
});

module.exports = { registerUser, loginCallback, passport };
