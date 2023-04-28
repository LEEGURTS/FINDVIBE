const connection = require("../../connect/connection");
const crypto = require("crypto");

// Promise 반환 -> api에서 await을 붙여 사용가능 -> 비동기 처리
function getUserIdByNickname(nickname) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM user_info WHERE nickname = '${nickname}'`;
    connection.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }

      if (results.length === 0) {
        console.log("no exist user");
        reject(err);
        return;
      }

      console.log("userID:" + results[0].user_id);

      resolve(results[0].user_id);
    });
  });
}

function saveRequestLog(user_id, img_path) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO search_request_log (user_id, img_src, req_time) VALUES (?, ?, now())`;
    connection.query(sql, [user_id, img_path], (err) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }

      resolve(true);
    });
  });
}

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
  //return crypto.randomBytes(64).toString("base64");
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
  getUserIdByNickname: getUserIdByNickname,
  saveRequestLog: saveRequestLog,
  createRandomString: createRandomString,
  convertPassword: convertPassword,
};
