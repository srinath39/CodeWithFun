const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const { getAllProblems, getProblemById, createNewCodingProblem, addNewTestCaseByProblemId, updateTestCaseByProblemId, deleteTestCaseByProblemId, updateCodingProblem, deleteCodingProblem } = require("../controller/problemController");

router.get('/all', getAllProblems);

router.get('/:problemId', checkAuth, getProblemById);

// only Admin 

// router.use()  // middleware , if user is an Admin ,will able to create/ update/ delete  problem and its test cases 

router.post('/new', checkAuth, createNewCodingProblem);    // Adding a problem with mandatory test cases 

router.patch('/:problemId/update', checkAuth, updateCodingProblem);    // update a problem details

router.delete('/:problemId/delete', checkAuth, deleteCodingProblem);   // delete the problem (Deleting the problem also deletes test cases)


// CRUD in TestCases of A Specific problem

router.post('/:problemId/testcases', checkAuth, addNewTestCaseByProblemId);    //  Adding one / Many test cases to the problem 

router.put('/:problemId/testcases/:testcaseId', checkAuth, updateTestCaseByProblemId);    // update a specific test case of a specific problem

router.delete('/:problemId/testcases/:testcaseId', checkAuth, deleteTestCaseByProblemId);   // delete a specific test case of a specific problem


module.exports = router;  