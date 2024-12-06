const express = require('express');
const registerController = require('../controllers/controller');


const router = express.Router();

router.post('/register', async(req, res , next) => {
    try {
        
        await registerController.userRegisterController(req,res, next);
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.get('/login', async(req, res , next) => {
    try {
        await registerController.loginController(req,res, next);
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.post('/passwordReset', async(req, res, next) =>{
    try {
        await registerController.passResetController(req, res)
    } catch (error) {
        next();
    }
})

module.exports = router;




