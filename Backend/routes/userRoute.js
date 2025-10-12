const express = require("express");
const router = express.Router();
const { createNewUser, loginUser, getUserCredentials, updateUserDetails, deleteUserFromDatabase } = require("../controller/userController");


// get user credentials by userId 
router.get('/:userId', getUserCredentials);

// Register User 
router.post('/register', createNewUser);

// login User 
router.post('/login', loginUser);

// update User credentials
router.put('/:userId/update', updateUserDetails)

// delete User 
router.delete('/:userId', deleteUserFromDatabase);


module.exports = router;


