const jwt = require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();

const verfiyUser = (req, res, next) => {
    try {
        const intiToken = req.headers.authorization;   // "Bearer Token"  
        const token = intiToken.split(' ')[1];   // Actual token 
        console.log(token);
        if (!token) {
            throw new Error("Authentication failed !");
        }
        req.userData = jwt.verify(token,process.env.SECRET);
        next();
    } catch (err) {
        next(err);
    }
}
module.exports=verfiyUser;
