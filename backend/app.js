const express = require('express');
const errorMiddleware = require('./middlewares/errors');
const cookieParser = require('cookie-parser')
const app = express();

//handle uncaught exception
process.on('uncaughtException',(err)=>{
    console.log(`Error : ${err.message}`);
    console.log('Shutting server down due to uncaught exception');
    process.exit(1);
})

app.use(express.json());
app.use(cookieParser())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


require('./routes/productRoutes')(app);
require('./routes/userRoutes')(app)

//errorMiddleware to handle errors
app.use(errorMiddleware);

module.exports = app;