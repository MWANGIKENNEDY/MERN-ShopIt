//check whether user is authenticated or not

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require('../models/users');


exports.isAuthenticated = catchAsyncErrors( async (req,res,next)=>{

    const {token} = req.cookies;

    if(!token){

        return next(new ErrorHandler('Kndly login first to view resources',401))

    }

    const decodedToken = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedToken.id);

    //go to next middleware
    next();

})


exports.authorizeRoles = (...roles) =>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role (${req.user.role}) is not authorized to view this resource`,403))
        }
        //got to next middleware
        next()
    }
}