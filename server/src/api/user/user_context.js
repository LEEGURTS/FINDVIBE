// modules
const crypto = require("crypto");
// our_modules
const UserInfo = require("../../connect/models/user_info");
// our_val

// DB -------------------------------------------------------
function createUserInfo(email, password, nickname, convert_key) {
  return new Promise((resolve, reject) => {
    UserInfo.create({
      email: email,
      password: password,
      nickname: nickname,
      convert_key: convert_key,
    }).then((user_info)=>{
      console.log("new_user:"+user_info.nickname);
      resolve(true);
    }).catch((err) => {
      console.error(err);
      reject(err);
      return;
    });
  });
}

// serialize 관련 ------------------------------------------

// 암호화 key 랜덤 뽑기
function createRandomString() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) {
        reject(err);
      }
      resolve(buf.toString("base64"));
    });
  });
}

function convertPassword(password, convert_key) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, convert_key, 9999, 64, "sha512", (err, key) => {
      if (err) {
        reject(err);
      }
      resolve(key.toString("base64"));
    });
  });
}

module.exports = {
  createUserInfo: createUserInfo,
  createRandomString: createRandomString,
  convertPassword: convertPassword,
};