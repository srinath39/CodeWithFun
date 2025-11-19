const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verfiyUser = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new Error("Authentication failed !");
        }
        req.userId = jwt.verify(token, process.env.SECRET).id;
        next();
    } catch (err) {
        return next(err);
    }
}
module.exports = verfiyUser;
