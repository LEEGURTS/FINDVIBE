const express = require("express");
const jwt = require("jsonwebtoken");
const util = require("../util/util");

const UserInfo = require("../../connect/models/user_info");
const dotenv = require("dotenv");
const axios = require('axios');

dotenv.config();

const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;

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

// 데이터 받아서 저장 + python 서버에 전송
router.post("/", upload.array("image"), async (req, res) => {
  // 유효성 확인 - 사용자 정보 받아오기
  const checkToken = req.cookies.find_vibe_refresh_token;

  if (!checkToken) {
    return res
      .status(400)
      .json({ success: false, message: "Not exist Token." });
  }

  try {
    // 검증 - 실패 시 에러 발생
    const user_data = jwt.verify(checkToken, refreshTokenKey);

    const nickname = user_data.nickname;

    const user_info = await UserInfo.findOne({
      raw: true,
      where: { nickname : nickname },
    }).catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, error: "db connect fail!" });
      return;
    });

    const user_id = user_info.user_id;

    console.log("userId:" + user_id);

    // path
    const imagePathList = req.files.map((img) => {
      return img.path;
    });

    // path와 user_info를 DB에 저장
    //imagePathList.map(async (imagePath) => {
    //  await util.saveRequestLog(userId, imagePath);
    //});

    // TODO: python 서버로 요청 전송
    const url = 'http://localhost:5002/predict';

    axios.post(url, imagePathList)
      .then(response => {
        // 응답 처리
        console.log(response.data);
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
