const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DBConnection = async () => {
    const MONGO_URI = process.env.MONGO_URI;
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database connection was sucessful");
    } catch (error) {
        console.log("Database connetion Failed", error);
    }
};

module.exports = { DBConnection };