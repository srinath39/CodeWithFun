const express=require('express');
const app=express();
const {DBConnection}=require("./database/db.js");
const User = require("./models/users");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");


app.listen(3000,()=>{
    console.log('Server running on port number 3000');
});

DBConnection(); 

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{      
    res.send('Hello world');
});

app.post('/register',async (req,res)=>{  
    // get all the data
    const {firstname,lastname,email,password} = req.body;
    // check whether all data exist or not
    if(!(firstname && lastname && email && password)){
        return res.status(400).send("Please all the details");
    }
    // check if the user is already exist in the DB
    const existingUser =await  User.findOne({email});
    if(existingUser){
        return res.status(400).send("User email already Exist");
    }
    // encrypt the password
    const salt=bcrypt.genSaltSync(10);
    const hashPassword=bcrypt.hashSync(password,salt);

    // save the user in the DB
    const newUser=await User.create({firstname,lastname,email,password:hashPassword});

    // generate a JWT token for user and send it 
    const token=jwt.sign({id:newUser._id,email},process.env.SECRET,{expiresIn:"1h"});
    newUser.password=undefined;
    return res.status(200).json({
        msg:"You have Successfully Registered",
        newUser,
        token
    });
});
  