const SubmissionModel = require("../models/submissionSchema");
const mongoose = require("mongoose");
const HttpError = require("../models/http-Error");


// retreving all my submissioms of all problems 
const getAllMySubmissions = async (req, res, next) => {
    const userId = req.userId;
    await getSubmissionresponseHelper({ userId }, res, next);
};

// retreving all my submissions of a specific problem
const getAllMySubmissionsOfProblem = async (req, res, next) => {
    const userId = req.userId;
    const problemId = req.params.problemId;

    // check the ID is in correct format or not
    if (!mongoose.Types.ObjectId.isValid(problemId)) {
        return next(new HttpError("Problem Id Format is wrong, try with correct Id format", 400));
    }
    const filter = { userId, problemId };
    await getSubmissionresponseHelper(filter, res, next);
};

// retreving all submissions of a specific problem
const getAllSubmissionsOfProblem = async (req, res, next) => {
    const problemId = req.params.problemId;

    // check the ID is in correct format or not
    if (!mongoose.Types.ObjectId.isValid(problemId)) {
        return next(new HttpError("Problem Id Format is wrong, try with correct Id format", 400));
    }
    await getSubmissionresponseHelper({ problemId }, res, next);
};

const getSubmissionresponseHelper = async (filter, res, next) => {
    try {
        const submissions = await SubmissionModel.find(filter)
            .populate({
                path: "userId",
                select: "firstname lastname"
            })
            .populate({
                path: "problemId",
                select: "title"
            })
            .sort({ submittedTime: -1 });

        if (!submissions.length) {
            return next(new HttpError(`No submissions found for the provided ${filter.userId ? "userId" : ""} ${filter.problemId ? "problemId" : ""}`, 400));
        }
        const formattedSubmission = submissions.map(sub => ({
            userName: `${sub.userId.firstname} ${sub.userId.lastname}`,
            problemTitle: sub.problemId.title,
            verdict: sub.result,
            runtime: sub.runtime,
            language: sub.language,
            submittedTime: sub.submittedTime
        }));
        return res.status(200).json({
            submissions: formattedSubmission
        });
    }
    catch (err) {
        return next(new HttpError("Something went wrong", 500));
    }
};

module.exports = { getAllMySubmissions, getAllMySubmissionsOfProblem, getAllSubmissionsOfProblem };


