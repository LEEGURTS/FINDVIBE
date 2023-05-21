// modules
const express = require("express");
const router = express.Router();
// our_modules
const userContext = require("../user_context");
const authContext = require("../../auth/auth_context");
const sessionAuth = require("../../api/sessionAuth");

router.post("/", sessionAuth, async (req, res) => {
  try {
    // token에 저장된 email -> user select
    const user_info = req.user_info;
    const password = req.body.password;

    const user_data = await authContext.getUserDataByEmail(user_info.email);

    const convert_password = await userContext.convertPassword(password, user_data.convert_key);

    if(user_data.password === convert_password){
      return res.status(200).json({ success: false, error: "이미 사용한 비밀번호입니다!" });
    }

    await userContext.updateUserPassword(user_info.email, convert_password);

    return res.status(200).json({ success: true, error: "" });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "server error:"+err });
  }
});

module.exports = router;