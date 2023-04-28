const express = require("express");
const connection = require("../../connect/connection");
const util = require("../util/util");
const router = express.Router();

// api - 회원 가입
router.post("/signup", async (req, res) => {
  const { email, password, nickname } = req.body;

  const convert_key = await util.createRandomString();

  const convert_password = await util.convertPassword(password, convert_key);

  const sql = `INSERT INTO user_info (email, password, nickname, convert_key, join_time, is_admin) VALUES (?, ?, ?, ?, now(), false)`;
  connection.query(
    sql,
    [email, convert_password, nickname, convert_key],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: "server error" });
      }
      return res.json({ success: true, error: "" });
    }
  );
});

module.exports = router;
