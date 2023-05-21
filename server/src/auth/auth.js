const express = require("express");
const router = express.Router();
const authContext = require("./auth_context");
const LogIn = require("./api/login");
const LogOut = require("./api/logout");
const Check = require("./api/check");

// api - 로그인
router.use("/login", LogIn);

// api -  로그아웃
router.use("/logout", LogOut);

// check access_token + return user_data
router.use("/check", Check);


module.exports = router;
