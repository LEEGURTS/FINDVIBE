const express = require("express");
const router = express.Router();
const authContext = require("./auth_context");
const userContext = require("../user/user_context");

// api - 로그인
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user_data = await authContext.getUserDataByEmail(email);

  const convert_password = await userContext.convertPassword(
    password,
    user_data.convert_key
  );

  if (user_data.password != convert_password) {
    res.status(401).json({ success: false, error: "Password is not Correct." });
    return;
  }
  
  const token_list = authContext.createTokens(user_data);

  res.cookie("find_vibe_access_token", token_list[0], {
    httpOnly: true,
    secure: false,
  });

  req.session.refreshToken = token_list[1];

  res.status(200).json({
    success: true,
    nickname: user_data.nickname,
    email: email,
    login_time: new Date(),
    error: "",
  });
});

// api -  로그아웃
router.post("/logout", (req, res) => {
  res.clearCookie("find_vibe_access_token");
  delete req.session.refreshToken;

  res.json({ success: true, error: "" });
});

// check access_token + return user_data
router.post("/check", async (req, res) => {
  const checkToken = req.cookies.find_vibe_access_token;

  if (!checkToken) {
    return res.status(401).json({ success: false, error: "Not exist Token." });
  }

  try {
    // 검증 - 실패 시 에러 발생
    authContext.checkAccessToken(checkToken);

    return res.status(200).json({ success: true });
  } 
  catch (error) {
    return res
      .status(401)
      .json({ success: false, error : error.message });
  }
});

// access 토큰 재발행
router.post("/refresh", (req, res) => {
  const checkToken = req.session.refreshToken;

  if (!checkToken) {
    return res
      .status(400)
      .json({ success: false, message: "there is no Token(cookie)" });
  }

  try {
    const token_list = authContext.refreshAccessToken(checkToken);

    res.cookie("find_vibe_access_token", token_list[0], {
      httpOnly: true,
      secure: false,
    });
    
    return res.status(200).json({ success: true });
  
  } catch (error) {
    
    return res
      .status(401)
      .json({ success: false, error: error.message });
  }
});

module.exports = router;
