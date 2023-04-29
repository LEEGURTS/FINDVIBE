//const mysql = require("mysql");
const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// orm 연결
let sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  username: process.env.DB_USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  dialect: "mysql",
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB Connected Success");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = sequelize;
