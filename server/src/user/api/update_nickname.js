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
    const user_data = req.user_info;

    const new_nickname = req.body.nickname;

    await userContext.updateUserNickname(user_data.email, new_nickname);

    return res.status(200).json({ success: true, error: "" });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "server error:"+err });
  }
});

module.exports = router;