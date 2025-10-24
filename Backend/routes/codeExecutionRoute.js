const express = require("express");
const router = express.Router();
const { runCodeWithCompiler , submitProblemCode} = require('../controller/ExecutionController');

router.post('/run', runCodeWithCompiler);

router.post('/:problemId/submit', submitProblemCode);

module.exports = router;