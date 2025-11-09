const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "problem",
        required: true,
    },
    result: {
        type: String,
        required: true,
    },
    runtime: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    submittedTime: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("submission", submissionSchema);
