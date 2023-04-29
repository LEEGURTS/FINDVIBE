const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
//const connection = require("../../connect/connection");
const UserInfo = require("../../connect/models/user_info");
const util = require("../util/util");

const dotenv = require("dotenv");
const sequelize = require("../../connect/connection");

dotenv.config();

// 토큰 키
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;

// api - 로그인
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user_data = await UserInfo.findOne({
    raw: true,
    where: { email: email },
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ success: false, error: "db connect fail!" });
    return;
  });

  if (!user_data) {
    res.status(401).json({ success: false, error: "Not Exist User." });
    return;
  }

  const convert_password = await util.convertPassword(
    password,
    user_data.convert_key
  );

  if (user_data.password != convert_password) {
    res.status(401).json({ success: false, error: "Password is not Correct." });
    return;
  }

  // 사용자 정보에 접근에 사용 - 만료기간 10분
  const accessToken = jwt.sign(
    {
      email: user_data.email,
      nickname: user_data.nickname,
    },
    accessTokenKey,
    { expiresIn: "10m", issuer: "FindVibe" }
  );

  // accessToken 재발행에 사용 - 만료기간 2시간
  const refreashToken = jwt.sign(
    {
      email: user_data.email,
      nickname: user_data.nickname,
    },
    refreshTokenKey,
    { expiresIn: "2h", issuer: "FindVibe" }
  );

  req.session.user = {
    id: user_data.user_id,
    email: user_data.email,
    name: user_data.name,
  };

  res.cookie("find_vibe_access_token", accessToken, {
    httpOnly: true,
    secure: false,
  });

  res.cookie("find_vibe_refresh_token", refreashToken, {
    httpOnly: true,
    secure: false,
  });

  res.status(200).json({
    success: true,
    login_time: new Date(),
    error: "",
  });
});

// api -  로그아웃
router.post("/logout", (req, res) => {
  res.clearCookie("find_vibe_access_token");
  res.clearCookie("find_vibe_refresh_token");
  res.clearCookie("find_vibe_session");
  res.json({ success: true, error: "" });
});

// check access_token + return user_data
router.post("/check", (req, res) => {
  const checkToken = req.cookies.find_vibe_access_token;

  if (!checkToken) {
    return res.status(401).json({ success: false, error: "Not exist Token." });
  }

  try {
    // 검증 - 실패 시 에러 발생
    const user_data = jwt.verify(checkToken, accessTokenKey);

    const { password, ...other } = user_data;

    return res.status(200).json({ other, success: true });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ success: false, error: "Token is Expired" });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }

    return res
      .status(500)
      .json({ success: false, error: "server error:" + error.message });
  }
});

// access 토큰 재발행
router.post("/refresh", (req, res) => {
  const checkToken = req.cookies.find_vibe_refresh_token;

  if (!checkToken) {
    return res
      .status(400)
      .json({ success: false, message: "there is no Token(cookie)" });
  }

  try {
    // 검증 - 실패 시 에러 발생
    const user_data = jwt.verify(checkToken, refreshTokenKey);

    const accessToken = jwt.sign(
      {
        email: user_data.email,
        nickname: user_data.nickname,
      },
      accessTokenKey,
      { expiresIn: "10m", issuer: "FindVibe" }
    );

    res.cookie("find_vibe_access_token", accessToken, {
      httpOnly: true,
      secure: false,
    });

    return res.status(200).json({ success: true, error: "" });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ success: false, error: "Token is Expired" });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }

    return res
      .status(500)
      .json({ success: false, error: "server error:" + error.message });
  }
});

module.exports = router;
