// middlewares/multer.js
const multer = require('multer');

const upload = multer({ dest: '/assets/uploads/'});

module.exports = upload;
