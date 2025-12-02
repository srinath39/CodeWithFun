const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const { runCodeWithCompiler, submitProblemCode } = require('../controller/ExecutionController');

router.post('/run', checkAuth, runCodeWithCompiler);

router.post('/:problemId/submit', checkAuth, submitProblemCode);

module.exports = router;