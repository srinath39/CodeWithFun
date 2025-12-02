const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const { createNewUser, loginUser, logoutUser, tokenSuccessMsg, getUserCredentials, updateUserDetails, deleteUserFromDatabase } = require("../controller/userController");


// Register User 
router.post('/register', createNewUser);

// login User 
router.post('/login', loginUser);

// user logout
router.post('/logout', checkAuth, logoutUser);

// check the token is valid or not 
router.get('/verify-token', checkAuth, tokenSuccessMsg);

// get user credentials by userId 
router.get('/:userId', checkAuth, getUserCredentials);

// update User credentials
router.put('/:userId/update', checkAuth, updateUserDetails)

// delete User 
router.delete('/:userId', checkAuth, deleteUserFromDatabase);


module.exports = router;


