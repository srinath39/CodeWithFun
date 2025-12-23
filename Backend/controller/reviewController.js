const { aiCodeReviewGenerator } = require("../Utils/ReviewGenerators/aiCodeReviewGenerator")

const aiCodeReviewController = async (req, res, error) => {
    const { code, description } = req.body;
    // if no code is provided irrespective of any language, we need to throw an error
    if (!code) {
        return next(new HttpError("The code is Empty, please provide the code", 404));
    }
    // if no problem Description is provided, we need to throw an error
    if (!description) {
        return next(new HttpError("The problem Description is Empty, please provide the problem Description", 404));
    }

    try {
        const aiCodeReview = await aiCodeReviewGenerator(code,description);
        return res.status(200).json({
            aiReview: aiCodeReview
        })
    } catch (error) {
        return next(new HttpError(error.message, error.errorCode));
    }
}

module.exports = { aiCodeReviewController };