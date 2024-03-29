const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name'],
        maxLength:[30,'Your name cannot exceed 100 characters']
    },
    email:{
        type:String,
        required:[true,'Please enter your email'],
        unique:true,
        validate:[validator.isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter your password'],
        minLength:[6,'Your password must be longer than 6 characters']
    },

    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },

    role:{
        type:String,
        default:'user'
    },
  
    createdAt:{
        type:Date,
        default:Date.now
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date
})

//encrypt password before saving to db

userSchema.pre('save',async function (next){
    //if password is not modified, do not update the encrypted password
    if(!this.isModified('password')){
        next()
    }
    //else encrypt password
    this.password = await bcrypt.hash(this.password,10);
})


//return JWT token

userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY
    })
}

//compare user password -- return true or false
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);

}

//generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    //generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
    //hash and set to reset password token

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //set token expire time
    this.resetPasswordExpire = Date.now() + 30*60*60;

    //sending password reset token as it is for user to reset their password -- 
    //hashed version is saved in the database for comparison when user requests for password request
    return resetToken;

}





module.exports = mongoose.model('User',userSchema);