// make a config for dotenv
require("dotenv").config();
const { SESSION_KEY } = process.env;
const session = require("express-session");
const pg = require("pg-simple-connection")(session);
const pool = require("./config/database");

module.exports = session({
  store: new pg({ pool: pool, createTableIfMissing: true }),
  secret: SESSION_KEY,
  resave: false,
  saveUninitialized: true,
});
