// modules
const express = require("express");
const router = express.Router();
// our_modules
const userContext = require("../user_context");

// api - 회원 가입
router.post("/", async (req, res) => {
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

module.exports = router;