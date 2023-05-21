// modules
const crypto = require("crypto");
// our_modules
const UserInfo = require("../connect/models/user_info");
// our_val

// DB create-------------------------------------------------------
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

// DB update --------------------------------------------------
function updateUserNickname(email, nickname) {
  return new Promise((resolve, reject) => {
    UserInfo.update({
      nickname: nickname,
    },{
      where : {
        email : email
    }}).then(()=>{
      resolve(true);
    }).catch((err) => {
      console.error(err);
      reject(err);
      return;
    });
  });
}

function updateUserPassword(email, password) {
  return new Promise((resolve, reject) => {
    UserInfo.update({
      password: password,
    },{
      where : {
        email : email
    }}).then(()=>{
      resolve(true);
    }).catch((err) => {
      console.error(err);
      reject(err);
      return;
    });
  });
}

// DB select --------------------------------------------------
function getUserDataByNickname(nickname) {
  return new Promise((resolve, reject) => {
    UserInfo.findOne({
      raw: true,
      where : {nickname : nickname}
    }).then((user_data)=>{
      resolve(user_data);
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
  getUserDataByNickname: getUserDataByNickname,
  updateUserNickname: updateUserNickname,
  updateUserPassword: updateUserPassword,
  createRandomString: createRandomString,
  convertPassword: convertPassword,
};