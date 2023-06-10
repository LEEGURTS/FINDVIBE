const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const session = require("express-session");
//const MongoStore = require("connect-mongo");

dotenv.config();
const route = require("./src/route/route");

const port = process.env.PORT;
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setting
app.use(cors());

// session
// 로컬에서 실행시키려면 store: new session.MemoryStore() 로 바꾸기
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: new session.MemoryStore(),
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 1일
    },
  })
);

// build 파일 접근
app.use(express.static(`${__dirname}/../client/build`));

// api 엔드 포인트 등록
app.use("", route);

// react 앱과 연결
app.get(`*`, (req, res) => {
  let indexPath = path.join(__dirname, "../client/build/index.html");
  res.sendFile(indexPath);
});

app.listen(port, () => console.log(`port: ${port}`));

module.exports = app;
