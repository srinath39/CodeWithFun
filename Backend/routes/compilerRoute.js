const express= require("express");
const router=express.Router();
const {runCodeWithCompiler}=require('../controller/compilerController');

router.post('/run',runCodeWithCompiler);

module.exports =router;