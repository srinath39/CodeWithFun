const HttpError = require("../models/http-Error");
const langaugeMap = require("../Utils/Language/getAllLangauges");

const getAllLanguagesController = (req, res, next) => {
    res.status(200).json({
        msg: "Programming langauges with Extensions",
        lang: Object.fromEntries(langaugeMap)
    });
};

module.exports = { getAllLanguagesController };