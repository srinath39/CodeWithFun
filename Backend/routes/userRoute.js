const express = require("express");
const router = express.Router();
const { createNewUser, loginUser } = require("../controller/userController");


// Register User 
router.post('/register', createNewUser);

// login User 
router.post('/login', loginUser);

module.exports=router;


