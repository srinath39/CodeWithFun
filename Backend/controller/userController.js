const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


const createNewUser = async (req, res) => {
    // get all the data
    const { firstname, lastname, email, password } = req.body;
    // check whether all data exist or not
    if (!(firstname && lastname && email && password)) {
        return res.status(401).send("Please all the details");
    }
    // check if the user is already exist in the DB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(401).send("User email already Exist");
    }
    // encrypt the password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // save the user in the DB
    const newUser = await User.create({ firstname, lastname, email, password: hashPassword });
    if (newUser) {
        return res.status(201).send("User registered successfully");
    }
};

const loginUser = async (req, res) => {
    // get all the data
    const { email, password } = req.body;

    // check all data exist or not 
    if (!(email && password)) {
        return res.status(401).send("Please provide all credentials");
    }

    // check user with eamil exist
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.status(401).send("User with this email does'nt exist, please create new account");
    }

    // check existing user password matched with given password
    const isPasswordMatched = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordMatched) {
        return res.status(401).send("Password does'nt match with the Given email, please retry with correct password");
    }

    // generate a JWT token for user and send it 
    const token = jwt.sign({ id: existingUser._id, email }, process.env.SECRET, { expiresIn: "1h" });

    // Send he response with JWT token 
    existingUser.password = undefined;
    return res.status(202).json({
        msg: "user login and JWT token generated successfully",
        existingUser,
        token
    });
};


const getUserCredentials = async (req, res) => {
    // retrive the id from the url 
    const userId = req.params.userId;

    // check an Id follows object constraints or not
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send("User Id Format is wrong, try with correct Id format");
    }


    // retreive the user with given userId
    const existingUser = await User.findById({ _id: userId });
    if (!existingUser) {
        return res.status(401).send(`user with Id ${userId} does'nt exist`);
    }

    // send the User Credentials to the user 
    existingUser._id = undefined;
    existingUser.password = undefined;
    res.status(200).json({
        msg: "These are the user credentials",
        existingUser
    })

};

const updateUserDetails = async (req, res) => {

    // reteive the ID from URL
    const userId = req.params.userId;

    // check the ID is in correct format or not
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send("User Id Format is wrong, try with correct Id format");
    }

    // check the input data 
    const { firstname, lastname, email, password } = req.body;
    if (!(firstname && lastname && email && password)) {
        return res.status(401).send("Please provide all credentials");
    }

    // encrypt the password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);


    // check userId exist or not , if yes overwrite with new Credentials
    const updateUser = await User.findByIdAndUpdate(userId, { firstname, lastname, email, password: hashPassword }, {
        new: true,
        overwrite: true
    })
    if (!updateUser) {
        return res.status(401).send("User with this Id does'nt exist");
    }

    // send response
    return res.status(200).json({
        msg: "user credentials got updated",
        updateUser
    });
};

const deleteUserFromDatabase = async (req, res) => {
    // reteive the ID from URL
    const userId = req.params.userId;

    // check the ID is in correct format or not
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send("User Id Format is wrong, try with correct Id format");
    }

    // delete the user completly from database 
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
        return res.status(401).send("User with this Id does'nt exist");
    }

    // send the response 
    res.status(200).json({
        msg: "this user got deleted completely",
        deletedUser
    })
};

module.exports = { createNewUser, loginUser, getUserCredentials, updateUserDetails, deleteUserFromDatabase };