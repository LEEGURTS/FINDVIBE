// modules
// our_modules
const PredictLog = require("../../connect/models/predict_log");
// our_val

// Promise 반환 -> api에서 await을 붙여 사용가능 -> 비동기 처리
function saveRequestLog(user_id, img_src) {
  return new Promise((resolve, reject) => {
    PredictLog.RequestLog.create({
      user_id : user_id,
      img_src : img_src,
    }).then((log)=>{
      const log_id = log.log_id;
      resolve(log_id);
    }).catch((err) => {
      console.error(err);
      reject(err);
      return;
    });
  });
}

// Promise 반환 -> api에서 await을 붙여 사용가능 -> 비동기 처리
function saveResponseLog(user_id, req_log_id, result_data) {
  return new Promise((resolve, reject) => {
    PredictLog.ResponseLog.create({
      user_id : user_id,
      req_log_id : req_log_id,
      result_data : result_data,
    }).then((log)=>{
      const log_id = log.log_id;
      resolve(log_id);
    }).catch((err) => {
      console.error(err);
      reject(err);
      return;
    });
  });
}

async function processImagePathList(user_id, imagePathList){
    try{
      const request_log_list = await Promise.all(
        imagePathList.map(async (imagePath) => {
          const log_id = await saveRequestLog(user_id, imagePath);
          return { log_id: log_id, user_id: user_id, image_path: imagePath };
        })
      );

      return request_log_list;
    } catch(error){
      throw new Error(error);
    }
}

module.exports = {
  saveRequestLog : saveRequestLog,
  saveResponseLog : saveResponseLog,
  processImagePathList : processImagePathList,
};
