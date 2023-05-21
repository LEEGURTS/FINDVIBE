const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const tokenKey = process.env.TOKEN_KEY;

const sessionAuth = (req, res, next) => {
  const token = req.session.token;

  if (!token) {
    return res.status(401).json({ success: false, error: "Not Existed token" });
  }
  // 세션에서 사용자 정보를 request 객체에 저장하여 다른 핸들러에서 사용할 수 있도록 함
  req.user_info = jwt.verify(token, tokenKey);
  
  next();
};

module.exports = sessionAuth;