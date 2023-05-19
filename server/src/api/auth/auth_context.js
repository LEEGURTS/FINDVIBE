// modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// our_modules
const UserInfo = require("../../connect/models/user_info");
// our_val
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;

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
function createTokens(user_data){
    // API 접근 권한 확인에 사용 - 만료기간 10분
  const accessToken = jwt.sign(
    {
      is_admin: user_data.is_admin,
    },
    accessTokenKey,
    { expiresIn: "1h", issuer: "FindVibe" }
  );

   // accessToken 재발행에 사용 - 만료기간 24시간
  const refreshToken = jwt.sign(
    {
      user_id: user_data.user_id,
      is_admin: user_data.is_admin,
    },
    refreshTokenKey,
    { expiresIn: "24h", issuer: "FindVibe" }
  );

  return [accessToken, refreshToken];
}

function checkAccessToken(token){
  try {
    jwt.verify(token, accessTokenKey);
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

function refreshAccessToken(token){
  try {
    // 검증 - 실패 시 에러 발생
    const user_data = jwt.verify(token, refreshTokenKey);

    const token_list = createTokens(user_data);

    return token_list;

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token is Expired");
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    }

    throw new Error(error.message);
  }
}

module.exports = {
  getUserDataByEmail : getUserDataByEmail,
  checkAccessToken : checkAccessToken,
  createTokens : createTokens,
  refreshAccessToken : refreshAccessToken,
};
