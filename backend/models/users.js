const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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



module.exports = mongoose.model('User',userSchema);