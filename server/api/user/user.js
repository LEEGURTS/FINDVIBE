const express = require("express");
const connection = require("../../connection");

const router = express.Router();

// api - 회원 가입
router.post("/signup", (req, res) => {
  const { email, password, nickname } = req.body;
  const sql = `INSERT INTO user_info (email, password, nickname, join_time, is_admin) VALUES (?, ?, ?, now(), false)`;
  connection.query(sql, [email, password, nickname], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, error: "server error" });
    }
    return res.json({ success: true, error: "" });
  });
});

module.exports = router;
