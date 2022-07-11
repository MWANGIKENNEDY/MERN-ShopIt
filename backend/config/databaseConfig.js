const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({path:'backend/config/config.env'});

const url = process.env.MONGO_URL;
const connect = {};
connect.mongoose=mongoose;
connect.url=url;

async function connectToDb(){
    try{
       await connect.mongoose.connect(connect.url,{useNewUrlParser: true,useUnifiedTopology: true});
       console.log('connected to db successfully again')
    }catch(err){
        console.log("cannot conect to database",err);
        process.exit();
    }
}

module.exports=connectToDb;