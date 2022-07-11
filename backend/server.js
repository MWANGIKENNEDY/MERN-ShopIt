const app = require('./app');
const dotenv = require('dotenv');

const connectToDb = require('./config/databaseConfig');

dotenv.config({path:'backend/config/config.env'});


connectToDb();

app.listen(process.env.PORT,()=>{
    console.log(`App started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})