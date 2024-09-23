const multer = require("multer");
const storage = multer.memoryStorage();

exports.processImages = multer({
  storage: storage,
}).array("files");
