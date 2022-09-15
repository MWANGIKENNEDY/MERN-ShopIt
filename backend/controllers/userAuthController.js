const User = require('../models/users');
const errorHandler = require('../utils/errorHandler');

const catchAsyncErrors= require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/sendToken');

exports.registerUser= catchAsyncErrors( async (req,res,next) =>{

    const {name,email,password}= req.body;

    //create an instance of User

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:'avatar_id',
            url:'avatar_url'
        }
    })

    sendToken(user,200,res);

})

exports.logInUser= catchAsyncErrors( async (req,res,next) =>{

    const {email,password} = req.body;

    //check whether user entered username and password
    if(!email || !password){
        return next(new errorHandler('Please enter email & password',400));
    }

    //find user in database
    const user = await User.findOne({email}).select('+password');


    if(!user){
        return next(new errorHandler('Invalid username or password',401))
    }

    //check if user password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new errorHandler('Invalid username or password',401))
    }

    sendToken(user,200,res);

})

//logout user 

exports.logoutUser= catchAsyncErrors( async (req,res,next) =>{

//The best idea would be invalidating the cookie by setting the value to empty and include an expires field as well like below:
//res.cookie("key","empty the key content", {expires:old date, domain:'.example.com', path:'/'});
//res.cookie("token", "", { expires: new Date(0),domain:'.test.com', path: '/' });
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:'You have been logged out'
    })
})