require("dotenv").config;
const { HOST, USER, DATABASE, PASSWORD, SQL_PORT } = process.env;
const Pool = require("pg");

const pool = new Pool({
  host: HOST,
  user: USER,
  database: DATABASE,
  password: PASSWORD,
  port: SQL_PORT,
});

module.exports = pool;
