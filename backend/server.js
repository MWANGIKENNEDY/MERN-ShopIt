const app = require('./app');
const dotenv = require('dotenv');

const connectToDb = require('./config/databaseConfig');

dotenv.config({path:'backend/config/config.env'});


connectToDb();

const server = app.listen(process.env.PORT,()=>{
    console.log(`App started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

process.on('unhandledRejection',(err)=>{
    console.error(`Error : ${err}`);
    console.log('Shutting down server due to unhandled promise rejection')
    server.close(()=>{
        process.exit(1);
    })
})
