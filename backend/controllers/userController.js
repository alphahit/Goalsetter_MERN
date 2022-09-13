const asyncHandler = require("express-async-handler");

const User = require("../model/userModel");


const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



const loginUser = (req, res) => {

    res.json({message:"login user"})
}



const registerUser = asyncHandler(async (req, res) => {
    console.log("registerUser req.body=====>", req.body);
    const {email, password, name} = req.body
  
    if (!name) {
      res.status(400);
      throw new Error("Please Add A Name");
    }
    if (!email) {
        res.status(400);
        throw new Error("Please Add An Email");
      }
      if (!password) {
        res.status(400);
        throw new Error("Please Add A Password");
      }
      

    const userExists = await User.findOne({ email: email})
    if(userExists) {
      res.status(400);
      throw new Error("User Already Exists")
    }  

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({ name: name, email: email, password:hashedPassword});
      
   if(user) {
    res.status(201).json({ 
      _id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    })
   }else{
    res.status(400)
    throw new Error("Invalid User Data")
   }



  });

const getMe = (req, res) => {

    res.json({message:"User Data Display"})
}


  module.exports = {
    registerUser,
    loginUser,
    getMe
  };
  