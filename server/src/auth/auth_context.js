// modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// our_modules
const UserInfo = require("../connect/models/user_info");
// our_val
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
const tokenKey = process.env.TOKEN_KEY;

// DB SELECT -------------------------------------------------------------
function getUserDataByEmail(email) {
  return new Promise((resolve, reject) => {
    const user_data = UserInfo.findOne({
      raw: true,
      where: { email: email },
    }).catch((err) => {
      console.error(err);
      reject(err);
      return;
    });
  
    if (!user_data) {
      console.log("no exist user");
      reject(err);
      return;
    }
  
    resolve(user_data);
  });
  
}

// Token ------------------------------------------------------------------
function createToken(user_data){
   // jwt-token : user 정보 저장, 서버에서 사용, 24시간 만료기간
  const jwtToken = jwt.sign(
    {
      user_id: user_data.user_id,
      email: user_data.email,
      nickname: user_data.nickname,
      is_admin: user_data.is_admin,
    },
    tokenKey,
    { expiresIn: "24h", issuer: "FindVibe" }
  );

  return jwtToken;
}

function checkAndUpdateToken(token){
  try {
    const user_data = jwt.verify(token, tokenKey);
    const new_token = createToken(user_data);
    
    return new_token;

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
     throw new Error("Token is Expired");
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    }

    throw new Error( "server error:" + error.message);
  }
}

module.exports = {
  getUserDataByEmail : getUserDataByEmail,
  createToken: createToken,
  checkAndUpdateToken: checkAndUpdateToken,
};
