const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PW,
  port: +process.env.PORT,
});
