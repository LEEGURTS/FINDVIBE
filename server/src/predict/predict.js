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

    // requrst_log_db에 저장 -> log_id, image_list 객체를 반환
    const request_log_list = await predictContext.processImagePathList(user_id, imagePathList);
    
    // python 서버로 요청 전송
    const url = 'http://localhost:5002/predict';
    const response = await axios.post(url, request_log_list);

    // python 서버로부터 받은 예측 결과를 {string, object}로 변환
    const result = Object.entries(response.data.result).map(([log_id, predictions]) => {
      return {
        log_id,
        predictions,
      };
    });
    
    // response에 데이터 저장
    await predictContext.processPredictList(user_id, result);
    
    const predictions = result.map((item) => item.predictions);

    return res.status(200).json({ success: true, result:predictions });

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
