const expressAsyncHandler = require('express-async-handler');
const user = require("../models/user");
const generateToken = require('../middleware/generatetoken');

const registerUser  = expressAsyncHandler(async (req , res) =>{
const {username , email , password , isAdmin} = req?.body;
const userExists = await user.findOne({ email });
   if(userExists)
  throw new Error("User already exists");

   try{
    const User = await user.create({username , email ,password , isAdmin });
    res.status(200).json(User);    
    }
   catch(error){
    console.log(error);
    res.status(500).json("Registration failed");
   }
});

// fetch all user
const fetchUsers = expressAsyncHandler(async(req , res)=>{
  try{
   const users = await user.find({});
   res.json(users);
  }
  catch(error){
    res.json(error);
  }
});

const loginuser = expressAsyncHandler(async(req , res)=>{
 const {email , password} = req?.body;
 const userfound = await user.findOne({email});
 if(userfound && (await userfound?.isPasswordMatch(password))){
   res.json({
    _id: userfound?._id,
    username: userfound?.username,
    email: userfound?.email,
    isAdmin: userfound?.isAdmin,
    token: generateToken(userfound?._id),
   })
 }
 else{
 res.status(401);
 throw new Error("Invalid Login credentials");
 }
});



module.exports = {registerUser , fetchUsers , loginuser};

