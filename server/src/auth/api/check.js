const express = require("express");
const router = express.Router();
const authContext = require("../auth_context");

router.post("/", async (req, res) => {
  const token = req.session.token;

  if (!token) {
    return res.status(401).json({ success: false, error: "Not exist Token." });
  }

  try {
    // 검증 - 실패 시 에러 발생
    const new_token = authContext.checkAndUpdateToken(token);

    req.session.token = new_token;

    return res.status(200).json({
      success: true,
      login_time: new Date(),
    });
  } 
  catch (error) {
    return res
      .status(401)
      .json({ 
        success: false,
        error : error.message });
  }
});

module.exports = router;