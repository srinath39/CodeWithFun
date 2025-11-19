const express = require("express");
const router = express.Router();
const { getAllMySubmissions, getAllMySubmissionsOfProblem, getAllSubmissionsOfProblem } = require("../controller/submissionController");


router.get("/mySubmissions", getAllMySubmissions);

router.get("/:problemId/mySubmissions", getAllMySubmissionsOfProblem);

router.get("/:problemId/all", getAllSubmissionsOfProblem);

module.exports = router;