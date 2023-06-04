const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  delete req.session.token;

  res.json({ success: true, error: "" });
});

module.exports = router;