const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
const path = require("path");
const authRouter = require("./api/auth/auth");
const userRouter = require("./api/user/user");
const searchRouter = require("./api/search/search");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setting
app.use(cors());

// build 파일 접근
app.use(express.static(`${__dirname}/../client/build`));

// api 엔드 포인트 등록
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/search", searchRouter);

// react 앱과 연결
app.get(`*`, (req, res) => {
  let indexPath = path.join(__dirname, "../client/build/index.html");
  res.sendFile(indexPath);
});

app.listen(port, () => console.log(`port: ${port}`));

module.exports = app;
