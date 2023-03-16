const asyncHandler = require("express-async-handler");

const User = require("../model/userModel");


const jwt = require('jsonwebtoken')


//to encrypt password
const bcrypt = require('bcryptjs')


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

  //Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Main Call to create user (from user model name, email, password)
  const user = await User.create({ name: name, email: email, password:hashedPassword});
    
 if(user) {
  res.status(201).json({ 
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id)
    
  })
 }else{
  res.status(400)
  throw new Error("Invalid User Data")
 }



});

const loginUser =asyncHandler(async(req, res) => {

  const {email, password} = req.body

  const user = await User.findOne({ email: email})

  if (user && (await bcrypt.compare(password,user.password ))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  }else {
    res.status(400)
    throw new Error("Invalid Credentials")
  }
}) 





const getMe = asyncHandler(async(req, res) => {

    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
      id: _id,
      name,
      email
    })
}
)

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn:'30d'
  })
}



  module.exports = {
    registerUser,
    loginUser,
    getMe
  };
  