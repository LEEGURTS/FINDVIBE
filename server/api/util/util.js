const connection = require("../../connection");

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

module.exports = {
  getUserIdByNickname: getUserIdByNickname,
  saveRequestLog: saveRequestLog,
};
