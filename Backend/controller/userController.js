const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const createNewUser = async (req, res) => {
    // get all the data
    const { firstname, lastname, email, password } = req.body;
    // check whether all data exist or not
    if (!(firstname && lastname && email && password)) {
        return res.status(400).send("Please all the details");
    }
    // check if the user is already exist in the DB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send("User email already Exist");
    }
    // encrypt the password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // save the user in the DB
    const newUser = await User.create({ firstname, lastname, email, password: hashPassword });
    if (newUser) {
        return res.status(200).send("User registered successfully");
    }
};

const loginUser = async (req, res) => {
    // get all the data
    const { email, password } = req.body;

    // check all data exist or not 
    if (!(email && password)) {
        return res.status(404).send("Please provide all credentials");
    }

    // check user with eamil exist
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.status(400).send("User with this email does'nt exist, please create new account");
    }

    // check existing user password matched with given password
    const isPasswordMatched = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordMatched) {
        return res.status(400).send("Password does'nt match with the Given email, please retry with correct password");
    }

    // generate a JWT token for user and send it 
    const token = jwt.sign({ id: existingUser._id, email }, process.env.SECRET, { expiresIn: "1h" });

    // Send he response with JWT token 
    existingUser.password = undefined;
    return res.status(200).json({
        msg: "user login and JWT token generated successfully",
        existingUser,
        token
    });
};

module.exports = { createNewUser, loginUser };