const multer = require("multer");
const storage = multer.memoryStorage();

exports.processImage = multer({
  storage: storage,
}).single("picture");

exports.processImages = multer({
  storage: storage,
}).array("files");
