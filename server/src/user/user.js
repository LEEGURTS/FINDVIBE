// modules
const express = require("express");
const router = express.Router();
// our_modules
const SignUp = require("./api/signup");
const CheckNickname = require("./api/check_nickname");
const UpdateNickname = require("./api/update_nickname");
const UpdatePassword = require("./api/update_password");
// api - 회원 가입
router.use("/signup", SignUp);

router.use("/check/nickname", CheckNickname);

router.use("/update/nickname", UpdateNickname);

router.use("/update/password", UpdatePassword);

module.exports = router;
