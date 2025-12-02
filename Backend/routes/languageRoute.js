const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const { getAllLanguagesController } = require('../controller/LanguagesController');

router.get('/all', checkAuth, getAllLanguagesController);

module.exports = router;