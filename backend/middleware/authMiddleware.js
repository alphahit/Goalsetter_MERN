const jwt = require('jsonwebtoken')
const asyncHandler = require("express-async-handler");
const User = require('../model/userModel')
//This is to protect the data with correct bearer token
const protect = asyncHandler(async (req, res,next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user= await User.findById(decoded.id).select('-password')
            next()
        }catch(err){
            console.error(err)
            res.status(401)
            throw new Error("Not Authorized")
        }
    }


    if(!token){
        res.status(401)
        throw new Error("Not Authorized")
    }

})


module.exports = {protect}