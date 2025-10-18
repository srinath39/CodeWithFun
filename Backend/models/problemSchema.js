const mongoose=require("mongoose");
const testCaseSchema = new mongoose.Schema({
    input:{
        type:String,
        required:true,
        trim:true
    },
    expectedOutput:{
        type:String,
        required:true,
        trim:true
    },
    testCaseDescription:{
        type:String,
        trim:true
    },
    isSample:{
        type:Boolean,
        default:false
    }
});

const problemModelSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        require:true,
        unique:true
    },
    problemDescription:{
        type:String,
        trim:true,
        require:true
    },
    difficult:{
        type:Number,
        require:true
    },
    testCases:[testCaseSchema]
});

module.exports= mongoose.model("problem",problemModelSchema);