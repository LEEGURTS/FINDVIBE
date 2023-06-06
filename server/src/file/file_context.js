const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

function getImageBlobUrl(imgSrc){
  return new Promise((resolve, reject) => {
    fs.readFile(imgSrc, (error, data) => {
      if (error) {
        console.error('Error reading image:', error);
        reject(error);
        return;
      }
      resolve(data);
    });
  });
}

module.exports = {
  getImageBlobUrl : getImageBlobUrl
};
