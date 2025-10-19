const express = require("express");
const router = express.Router();
const { getAllLanguagesController } = require('../controller/LanguagesController');

router.get('/all', getAllLanguagesController);

module.exports = router;