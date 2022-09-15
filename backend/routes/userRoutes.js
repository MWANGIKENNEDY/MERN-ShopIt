module.exports=(app)=>{
    const router = require('express').Router();


    const user = require('../controllers/userAuthController');

    router.post('/register',user.registerUser);
    router.post('/login',user.logInUser);
    router.get('/logout',user.logoutUser)


    app.use('/api/v1/shopit/users',router);
}