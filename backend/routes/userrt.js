const express = require("express");
const { registerUser , fetchUsers, loginuser } = require("../controller/user");



const userRoute = express.Router();

userRoute.post("/register" , registerUser);
userRoute.post("/login" , loginuser);
userRoute.get("/" , fetchUsers);
module.exports = userRoute;
