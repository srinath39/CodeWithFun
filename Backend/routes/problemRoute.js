const express = require("express");
const router = express.Router();
const { getAllProblems, getProblemById, createNewCodingProblem, addNewTestCaseByProblemId, updateTestCaseByProblemId, deleteTestCaseByProblemId, updateCodingProblem, deleteCodingProblem } = require("../controller/problemController");

router.get('/all', getAllProblems);

router.get('/:problemId', getProblemById);

// only Admin 

// router.use()  // middleware , if user is an Admin ,will able to create/ update/ delete  problem and its test cases 

router.post('/new', createNewCodingProblem);    // Adding a problem with mandatory test cases 

router.patch('/:problemId/update', updateCodingProblem);    // update a problem details

router.delete('/:problemId/delete', deleteCodingProblem);   // delete the problem (Deleting the problem also deletes test cases)


// CRUD in TestCases of A Specific problem

router.post('/:problemId/testcases', addNewTestCaseByProblemId);    //  Adding one / Many test cases to the problem 

router.put('/:problemId/testcases/:testcaseId', updateTestCaseByProblemId);    // update a specific test case of a specific problem


router.delete('/:problemId/testcases/:testcaseId', deleteTestCaseByProblemId);   // delete a specific test case of a specific problem


module.exports = router;  