const express = require("express");

const router = express.Router();
const authRouter = require("../api/auth/auth");
const userRouter = require("../api/user/user");
const searchRouter = require("../api/search/search");

// api 엔드 포인트 등록
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/search", searchRouter);

module.exports = router;
