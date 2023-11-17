const express = require('express');
const router = express.Router();
const controller = require('../app/controller');

//ambil auth dari jwt
const { auth } = require('../utils/jwt');

//import passpoert dari utils
const pasport = require('../utils/passport');
const { dashboard } = require('../app/controller/api/v1/auth');

router.post('/v1/auth/login', controller.auth.login)
router.post('/v1/auth/register', controller.auth.register)
router.get('/v1/auth/whoami', auth, controller.auth.whoami)
//view
//register
router.get('/register', (req,res) =>{
    res.render('register.ejs')
})
router.post('/register', controller.auth.registerForm)

//login
router.get('/login', (req,res) =>{
    res.render('login.ejs')
})
// integrasikan passport dengan utils
router.post('/login', pasport.authenticate('local', {
    successRedirect: '/api/dashboard',
    failureRedirect: 'login'
}))

router.get('/dashboard', dashboard)
router.get('/whoami', controller.auth.whoami)

module.exports = router;

