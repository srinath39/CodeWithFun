const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const { getAllMySubmissions, getAllMySubmissionsOfProblem, getAllSubmissionsOfProblem } = require("../controller/submissionController");


router.get("/mySubmissions", checkAuth, getAllMySubmissions);

router.get("/:problemId/mySubmissions", checkAuth, getAllMySubmissionsOfProblem);

router.get("/:problemId/all", checkAuth, getAllSubmissionsOfProblem);

module.exports = router;