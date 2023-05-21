// modules
const express = require("express");
const router = express.Router();
// our_modules
const userContext = require("./user_context");
const authContext = require("../auth/auth_context");

// api - 회원 가입
router.post("/signup", async (req, res) => {
  try {
    const { email, password, nickname } = req.body;

    const convert_key = await userContext.createRandomString();

    const convert_password = await userContext.convertPassword(password, convert_key);

    await userContext.createUserInfo(email, convert_password, nickname, convert_key);

    return res.status(200).json({ success: true, error: "" });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "server error" });
  }
});

router.post("/check/nickname", async (req, res) => {
  try {
    const new_nickname = req.body.nickname;

    const same_nickname_user = await userContext.getUserDataByNickname(new_nickname);

    console.log(same_nickname_user);

    if( same_nickname_user != null ){
      return res.status(200).json({ success: false, error: "중복된 닉네임입니다." });
    }

    return res.status(200).json({ success: true, error: "" });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "server error:"+err });
  }
});

//
router.post("/update/nickname", async (req, res) => {
  const token = req.cookies.find_vibe_access_token;

  if (!token) {
    return res.status(401).json({ success: false, error: "Not exist Token." });
  }

  try {
    // token에 저장된 email -> user select
    const user_data = await authContext.checkAccessToken(token);

    const new_nickname = req.body.nickname;

    await userContext.updateUserNickname(user_data.email, new_nickname);

    return res.status(200).json({ success: true, error: "" });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "server error:"+err });
  }
});

router.post("/update/password", async (req, res) => {
  try {
    // token에 저장된 email -> user select
    const {email, password} = req.body;

    const user_data = await authContext.getUserDataByEmail(email);

    const convert_password = await userContext.convertPassword(password, user_data.convert_key);

    if(user_data.password === convert_password){
      return res.status(200).json({ success: false, error: "이미 사용한 비밀번호입니다!" });
    }

    await userContext.updateUserPassword(email, convert_password);

    return res.status(200).json({ success: true, error: "" });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "server error:"+err });
  }
});

module.exports = router;
