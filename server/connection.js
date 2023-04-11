const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "findvibe_user",
  password: "findvibe1",
  database: "findvibe_db",
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL server");
});

module.exports = connection;
