const expressAsyncHandler = require('express-async-handler');
const user = require("../models/user");
const generateToken = require('../middleware/generatetoken');

const registerUser  = expressAsyncHandler(async (req , res) =>{
  const { username, email, password, isAdmin } = req?.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required fields' });
    }

    const userExists = await user.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const newUser = await user.create({ username, email, password, isAdmin });
    res.send("notexist");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});


// fetch one user
const fetchUserByEmail = expressAsyncHandler(async (req, res) => {
  const {  email } = req?.body;
  try {
    const userByEmail = await user.findOne({ email });

    if (userByEmail) {
      res.json(userByEmail);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

const loginuser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  const userfound = await user.findOne({ email });
  const username = userfound?.username;
  if (userfound) {
    try {
      const passwordMatch = await userfound.isPasswordMatch(password);
      if (passwordMatch) {
        res.status(200).json({
          success:true,
           username,
           email
        });
      } else {
        res.send("wrong details");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.send("notexist");
  }
});

module.exports = {registerUser , fetchUserByEmail , loginuser};

