const ErrorHandler = require("../utils/errorHandler");

module.exports =(err,req,res,next)=> {
    err.code = err.code || 500;
    //err.message = err.message || 'Internal Server Error'
    console.log(process.env.NODE_ENV);

    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.code).json({
            success:false,
            error:err,
            errMessage:err.message,
            stack:err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION'){
        let error = {...err}
        error.message= err.message;
        if(err.name === 'CastError'){
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new ErrorHandler(message,400);
        }
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message,400);
        }
        res.status(err.code).json({
            success:false,
            message:error.message || 'Internal server error'
        })
        
    }
    
}