const asyncHandler = require("express-async-handler");

const User = require("../model/userModel");

const loginUser = (req, res) => {

    res.json({message:"login user"})
}



const registerUser = asyncHandler(async (req, res) => {
    console.log("registerUser req.body=====>", req.body);
  
    if (!req.body.name) {
      res.status(400);
      throw new Error("Please Add A Name");
    }
    if (!req.body.email) {
        res.status(400);
        throw new Error("Please Add An Email");
      }
      if (!req.body.password) {
        res.status(400);
        throw new Error("Please Add A Password");
      }
      

  
    const user = await User.create({ name: req.body.name, email: req.body.email, password: req.body.password});
  
     res.json(user);




  });

const getMe = (req, res) => {

    res.json({message:"User Data Display"})
}


  module.exports = {
    registerUser,
    loginUser,
    getMe
  };
  