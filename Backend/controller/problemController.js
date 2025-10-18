const HttpError = require("../models/http-Error");
const ProblemModel = require("../models/problemSchema");
const EASY_LEVEL = 0;
const MEDIUM_LEVEL = 1;
const HARD_LEVEL = 2;

// get All problems 

const getAllProblems = async (req, res) => {
    // get All problems 
    try {
        const allProblems = await ProblemModel.find({});
    } catch (err) {
        //when something goes wrong while retreving 
        return next(new HttpError(err.message, 500));
    }

    if (!allProblems.length) {
        // No problems found
        return res.status(200).send("No problems found");
    }

    // if problems exist send them in json format 
    return res.status(200).json({
        msg: "All problems are retrieved",
        allProblems
    });
};

const getProblemById = async (req, res) => {
    //retrieve the id from URL
    const problemId = req.params.problemId;

    // check the id follows correct format or not 
    if (!mongoose.Types.ObjectId.isValid(problemId)) {
        return next(new HttpError("problem Id Format is wrong, try with correct Id format", 400));
    }

    // check if the problemId exist , if yes, return the problem with test cases 
    const codingProblem = await findById({ _id: problemId });
    if (!codingProblem) {
        return next(new HttpError("Problem with this Id does'nt exist", 404));
    }

    return res.status(200).json({
        msg: `Problem with Id ${problemId} retrieved successfully`,
        codingProblem
    })
};


const createNewCodingProblem = async (req, res) => {
    // load the data 
    const { title, description, difficulty, testCases } = req.body;

    // validate the input 
    if (!(title && description && difficulty && validateTestCases(testCases))) {
        return next(new HttpError("please provide entire problem and test data", 400));
    }

    // check whether the problem already exist 
    const existingProblem = await ProblemModel.findOne({ title });
    if (existingProblem) {
        return next(new HttpError("problem with the title already exist", 400));
    }

    // create the entry in the Database and if successful return it as a json data 
    const newProblem = await ProblemModel.create({ title, description, difficulty, testCases });
    if (newProblem) {
        return res.status(200).json(newProblem);
    }

};


const validateTestCases = (testCases) => {
    if (testCases.length >= 2) {
        testCases.every(testCase => {    //  If any object returns false, every() immediately stops and returns false. Only if all objects return true will every() return true.
            const { input, expectedOutput, testCaseDescription, isSample } = testCase;
            if (!(input && expectedOutput && testCaseDescription && isSample)) {
                return false;
            }
            return true;
        });
    }
    return false;
};

const updateCodingProblem = async (req, res) => {
    // retrieve the Id 
    const problemId = req.params.problemId;

    // check the ID is in correct format or not
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return next(new HttpError("problem Id Format is wrong, try with correct Id format", 400));
    }

    // validate the data
    const { title, description, difficulty } = req.body;
    if (!(title && description && difficulty)) {
        return next(new HttpError("please provide entire problem data", 400));
    }

    // find the problem with Id and update the changes 
    const updatedProblem = await ProblemModel.findByIdAndUpdate(problemId, { $set: { title, description, difficulty } }, { new: true, runValidators: true });
    if (!updatedProblem) {
        return next(new HttpError(`Problem with ${problemId} Does'nt exist`, 400));
    }

    //send the data
    return res.status(200).json({
        msg: "Problem got updated successdully",
        updatedProblem
    });
};

const deleteCodingProblem = async (req, res) => {
    // retrieve the Id 
    const problemId = req.params.problemId;

    // check the ID is in correct format or not
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return next(new HttpError("problem Id Format is wrong, try with correct Id format", 400));
    }

    // delete the user completly from database 
    const deletedProblem = await User.findByIdAndDelete(problemId);
    if (!deletedProblem) {
        return next(new HttpError(`Problem with ${problemId} Does'nt exist`, 401));
    }

    // send the response 
    res.status(200).json({
        msg: "this problem got deleted completely",
        deletedProblem
    })
};


const addNewTestCaseByProblemId = (req, res) => {

};

const updateTestCaseByProblemId = (req, res) => {

};

const deleteTestCaseByProblemId = (req, res) => {

};



module.exports = { getAllProblems, getProblemById, createNewCodingProblem, addNewTestCaseByProblemId, updateTestCaseByProblemId, deleteTestCaseByProblemId, updateCodingProblem, deleteCodingProblem };