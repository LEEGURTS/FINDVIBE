const express = require("express");
const jwt = require("jsonwebtoken");
const predictContext = require("./predict_context");

const UserInfo = require("../../connect/models/user_info");
const dotenv = require("dotenv");
const axios = require('axios');

dotenv.config();

const accessTokenKey = process.env.ACCESS_TOKEN_KEY;

const router = express.Router();
const multer = require("multer");

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

router.post("/", upload.array("image"), async (req, res) => {
  // 유효성 확인 - 사용자 정보 받아오기
  const checkToken = req.cookies.find_vibe_access_token;

  if (!checkToken) {
    return res
      .status(400)
      .json({ success: false, message: "Not exist Token." });
  }

  try {
    // 검증 - 실패 시 에러 발생
    jwt.verify(checkToken, accessTokenKey);

    const nickname = req.body.nickname;

    const user_info = await UserInfo.findOne({
      raw: true,
      where: { nickname : nickname },
    }).catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, error: "db connect fail!" });
      return;
    });

    const user_id = user_info.user_id;

    const imagePathList = req.files.map((img) => {
      return img.path;
    });

    const request_log_list = await predictContext.processImagePathList(user_id, imagePathList);

    // TODO: python 서버로 요청 전송
    const url = 'http://localhost:5002/predict';

    axios.post(url, request_log_list)
      .then(async(response) => {
        // data는 json으로 옴
        console.log(response.data);
        // json = [결과1, 결과2.....]
        // 결과 = {log_id, user_id, 결과}
        // await predictContext.saveResponseLog(결과 데이터 채우기);
      })
      .catch(error => {
        // 에러 처리
        console.error(error);
      });

    // 요청 결과가 오면 결과를 DB에 저장 밑 반환 success와 coordinate 전송하기
    return res.status(200).json({ success: true });
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
