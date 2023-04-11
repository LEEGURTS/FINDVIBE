const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const connection = require("../../connection");

// 토큰 키
const accessTokenKey = "1q2w3e4r@";
const refreshTokenKey = "123456789a";

// api - 로그인
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    `SELECT * FROM user_info WHERE email = '${email}'`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500).json({ success: false, error: "Server Error!" });
        return;
      }

      if (results.length === 0) {
        res.status(401).json({ success: false, error: "Wrong Email." });
        return;
      }

      const user_data = results[0];

      if (user_data.password != password) {
        res
          .status(401)
          .json({ success: false, error: "Password is not Correct." });
        return;
      }

      // 사용자 정보에 접근에 사용 - 만료기간 1분
      const accessToken = jwt.sign(
        {
          email: user_data.email,
          nickname: user_data.nickname,
        },
        accessTokenKey,
        { expiresIn: "1m", issuer: "FindVibe" }
      );

      // accessToken 재발행에 사용 - 만료기간 1일
      const refreashToken = jwt.sign(
        {
          email: user_data.email,
          nickname: user_data.nickname,
        },
        refreshTokenKey,
        { expiresIn: "24h", issuer: "FindVibe" }
      );

      res.cookie("find_vibe_access_token", accessToken, {
        httpOnly: true,
        secure: false,
      });

      res.cookie("find_vibe_refresh_token", refreashToken, {
        httpOnly: true,
        secure: false,
      });

      res.status(200).json({ success: true, error: "" });
    }
  );
});

// api -  로그아웃
router.post("/logout", (req, res) => {
  res.clearCookie("find_vibe_access_token");
  res.clearCookie("find_vibe_refresh_token");
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
