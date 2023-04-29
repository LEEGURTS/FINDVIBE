const express = require("express");
const util = require("../util/util");
const router = express.Router();
const UserInfo = require("../../connect/models/user_info");

// api - 회원 가입
router.post("/signup", async (req, res) => {
  const { email, password, nickname } = req.body;

  const convert_key = await util.createRandomString();

  const convert_password = await util.convertPassword(password, convert_key);

  UserInfo.create({
    email: email,
    password: convert_password,
    nickname: nickname,
    convert_key: convert_key,
    is_admin: false,
  })
    .then(() => {
      return res.json({ success: true, error: "" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ success: false, error: "server error" });
    });
});

module.exports = router;
