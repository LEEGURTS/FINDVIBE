const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.clearCookie("find_vibe_access_token");
  delete req.session.refreshToken;

  res.json({ success: true, error: "" });
});

module.exports = router;