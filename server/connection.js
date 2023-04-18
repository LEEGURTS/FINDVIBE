const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL server");
});

module.exports = connection;
