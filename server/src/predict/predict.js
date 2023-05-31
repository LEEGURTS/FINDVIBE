const express = require("express");
const jwt = require("jsonwebtoken");
const predictContext = require("./predict_context");

const UserInfo = require("../connect/models/user_info");
const dotenv = require("dotenv");
const axios = require('axios');

dotenv.config();

const tokenKey = process.env.TOKEN_KEY;

const router = express.Router();
const multer = require("multer");
const sessionAuth = require("../api/sessionAuth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 상대경로 - 옮기면 바꾸기
    cb(null, "../upload_images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now() + ".png");
  },
});

const upload = multer({ storage: storage });

// 데이터 받아서 저장 + python 서버에 전송 -----------------------------------------------------

router.post("/", upload.array("image"), sessionAuth, async (req, res) => {
  try {
    // 검증 - 실패 시 에러 발생
    const user_info = req.user_info;

    const user_id = user_info.user_id;

    const imagePathList = req.files.map((img) => {
      return img.path;
    });

    const request_log_list = await predictContext.processImagePathList(user_id, imagePathList);

    console.log("req_log:",request_log_list);
    // TODO: python 서버로 요청 전송
    const url = 'http://localhost:5002/predict';

    const response = await axios.post(url, request_log_list);

    const result = Object.entries(response.data.result).map(([log_id, predictions]) => {
      // 원하는 방식으로 데이터 처리 및 저장하기
      return {
        log_id,
        predictions
      };
    });

    console.log(result)

    const response_log_list = await predictContext.processPredictList(user_id, result)

    console.log(response_log_list);
    // result : {log_id:num, predict:pre_info[]}의 list
    // pre_info : {angle:float, 위도:float, 경도:float}의 list
    return res.status(200).json({ success: true, result:result });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ success: false, error: "Token is Expired" });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }

    return res
      .status(500)
      .json({ success: false, error: "server error:" + error.message });
  }
});

module.exports = router;
