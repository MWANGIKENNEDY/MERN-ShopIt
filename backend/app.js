const express = require('express');
const app = express();

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require('./routes/productRoutes')(app);

module.exports = app;