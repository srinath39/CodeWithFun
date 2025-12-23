const express = require("express");
const router = express.Router();
const { aiCodeReviewController } = require("../controller/reviewController");
const checkAuth = require("../middleware/checkAuth");

router.post('/ai-review', checkAuth, aiCodeReviewController)

module.exports = router;