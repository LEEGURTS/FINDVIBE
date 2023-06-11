const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

router.get("/img/:img_name", async (req,res)=>{
  const img_name = req.params.img_name;

  const absol_path = process.env.SAVE_PATH;

  if(!img_name){
    return res.status(401).json({success : false, message:"no img_name"});
  }

  try{
    return res.status(200).sendFile(absol_path+img_name);
  } catch(err){
    console.log(err)
    return res.status(401).json({success : false, message:"no image"});
  }
});

module.exports = router;
