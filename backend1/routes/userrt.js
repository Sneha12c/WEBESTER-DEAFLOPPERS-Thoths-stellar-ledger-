const express = require("express");
const { registerUser , loginuser, fetchUserByEmail } = require("../controller/user");

const userRoute = express.Router();

userRoute.post("/login" , loginuser);
userRoute.post("/register" , registerUser);
userRoute.get("/fetchuser" , fetchUserByEmail);
module.exports = userRoute;
