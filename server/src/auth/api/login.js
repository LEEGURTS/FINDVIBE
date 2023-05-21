const express = require("express");
const router = express.Router();
const authContext = require("../auth_context");
const userContext = require("../../user/user_context");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user_data = await authContext.getUserDataByEmail(email);

  const convert_password = await userContext.convertPassword(
    password,
    user_data.convert_key
  );

  if (user_data.password != convert_password) {
    res.status(401).json({ success: false, error: "Password is not Correct." });
    return;
  }
  
  const token = authContext.createToken(user_data);

  req.session.token = token;

  res.status(200).json({
    success: true,
    nickname: user_data.nickname,
    email: email,
    login_time: new Date(),
    error: "",
  });
});

module.exports = router;