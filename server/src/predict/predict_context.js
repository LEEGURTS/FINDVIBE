const dotenv = require("dotenv");
dotenv.config();
// our_modules
const PredictLog = require("../connect/models/predict_log");
const { Op } = require("sequelize");
const axios = require("axios");
const { ImageAnnotatorClient } = require("@google-cloud/vision");
const path = require("path");
// DB ----------------------------------------------------------------------
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
      resolve(log.result_data);
    }).catch((err) => {
      console.error(err);
      reject(err);
      return;
    });
  });
}

function getRequestLog(user_id, req_time) {
  return new Promise((resolve, reject) => {
    if (req_time==undefined){
      PredictLog.RequestLog.findAll({
        raw: true,
        where : { 
          user_id : user_id,
        }
      }).then((res)=>{
        resolve(res);
      }).catch((err) => {
        console.error(err);
        reject(err);
        return;
      });
    } else {
      const req_time_str = req_time.substring(0, 10);
      const req_date = new Date(req_time_str);
      const target_timestamp = req_date.toISOString();
      const next_day = new Date(req_date.getTime() + 24 * 60 * 60 * 1000);
      const next_timestamp = next_day.toISOString();

      PredictLog.RequestLog.findAll({
        raw: true,
        where : { 
          user_id : user_id,
          req_time: {
            // ex) 2020-05-28 14:00:00이 req_time이라면 2020-05-28 <= x < 2020-05-29인 것만 고르기
            [Op.gte]: target_timestamp,
            [Op.lt]: next_timestamp
          }
        }
      }).then((res)=>{
        resolve(res);
      }).catch((err) => {
        console.error(err);
        reject(err);
        return;
      });
    }
  });
}

function getResponseLog(user_id, req_log_id) {
  return new Promise((resolve, reject) => {
    PredictLog.ResponseLog.findAll({
      raw: true,
      where : { 
        user_id : user_id,
        req_log_id : req_log_id,
      }
    }).then((res)=>{
      resolve(res);
    }).catch((err) => {
      console.error(err);
      reject(err);
      return;
    });
  });
}

// Func --------------------------------------------------------------------
// imagePathList로 request_log를 저장하고 list로 반환
async function processImagePathList(user_id, imagePathList){
    try{
      const request_log_list = await Promise.all(
        imagePathList.map(async (imagePath) => {
          const log_id = await saveRequestLog(user_id, imagePath);
          return { log_id: log_id, image_path: getImageUrl(imagePath) };
        })
      );

      return request_log_list;
    } catch(error){
      throw new Error(error);
    }
}

async function processPredictList(user_id, predictResultList){
  console.log("start:",predictResultList);
  try{
    return await Promise.all(
      predictResultList.map(async(predictResult) => {
        const req_log_id = predictResult.log_id;
        const res_log_list = await Promise.all(
          predictResult.predictions.map(async (predict)=>{
            const point = {
              lat: predict.latitude,
              lng: predict.longitude,
              ang: predict.angle,
              adr: predict.address,
            };
            // 예측 성공
            if(point.lat || point.lng){
              if(point.ang!=0){
                // google이 아님 -> 좌표로 주소 받아야함
                const address = await getAddressFromLatLng(point);
                point.adr = address;
              }
              const result = await saveResponseLog(user_id, req_log_id, point);
              return result;
            }
          })
        );
        if(!res_log_list[0]){
          return [];
        } else {
        return res_log_list;
        }
      })
    );
  } catch(error){
    throw new Error(error);
  }
}

async function getUserPredictLog(user_id, req_time){
  // id, req_time이 일치하는 req, res log에서 {사진src, [request] }.array를 가져오기
  // 시간은 년,월,일
  try{
    const user_request_log_list = await getRequestLog(user_id, req_time);

    const log_id_list = user_request_log_list.map((user_request_log) => user_request_log.log_id);
    const img_src_list = user_request_log_list.map((user_request_log) => user_request_log.img_src);

    const user_response_log_list = await Promise.all(
      log_id_list.map(async (req_log_id)=>{
        const res_log = await getResponseLog(user_id, req_log_id);
        return res_log;
      })
    );

    const result = [];

    for (const [index, response_log] of user_response_log_list.entries()) {
      if(response_log.length==0){
        continue;
      }
      const req_log_id = response_log[0].req_log_id;
      const image_src = getImageUrl(img_src_list[index]);
      
      const result_data = response_log.map(item => item.result_data);
      const res_time = new Date(response_log[0].res_time).toISOString().substring(0, 10);
  
      for (const predict of result_data) {
        result.push({
          req_log_id,
          image_src,
          predict,
          res_time,
        });
      }
    }
 
    return result;
  } catch(error){
    
    throw new Error(error);
  }
}

// point : { lat: number; lng: number }
async function getAddressFromLatLng(point){
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${point.lat},${point.lng}&key=${process.env.GOOGLE_MAP_KEY}`
    const address = await axios.get(
      url,
      { 
        headers: {
          "Accept-Language":"ko"
        }
      });
    return address.data.results[0].formatted_address;
  } catch(err) {
    console.log("error:",err);
  }
}

async function sendPostRequestToPython (url, request_log_list) {
    const python_url = 'http://localhost:5002/predict';
    const response = await axios.post(python_url, request_log_list);
    return response;
}

function getImageUrl(imgName){
  return process.env.SERVER_URL+"/file/img/"+imgName;
}


async function predictByGoogle(img_list) {
  const result = await Promise.all(
    img_list.map(async (img) => {
      return await useGoogleAPI(img);
    })
  );
  return result;
}

async function useGoogleAPI(img_src) {
  const url = path.resolve(__dirname,"../../../upload_images/",img_src);
  
  console.log("분석:",url);
  try{
  const keyFilename = path.join('./verify.json');
  const client = new ImageAnnotatorClient({keyFilename});
  const [result] = await client.landmarkDetection(url);
  const landmarks = result.landmarkAnnotations;
  return landmarks;
  } catch(err){
    console.log("에러발생:",err);
    return [];
  }
  
}

module.exports = {
  saveRequestLog : saveRequestLog,
  saveResponseLog : saveResponseLog,
  processImagePathList : processImagePathList,
  processPredictList : processPredictList,
  getUserPredictLog : getUserPredictLog,
  getAddressFromLatLng : getAddressFromLatLng,
  sendPostRequestToPython : sendPostRequestToPython,
  getImageUrl : getImageUrl,
  predictByGoogle : predictByGoogle,
};
