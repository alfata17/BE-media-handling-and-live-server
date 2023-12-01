const express = require('express');
const router = express.Router();

//auth dari jwt
const { auth } = require('../utils/jwt')
//import passpoert dari utils
const pasport = require('../utils/passport');

const controller = require('../app/controller')

router.put('/v1/resetPassword/:email', auth, controller.resetPassword.resetP)
//register
router.get('/resetPassword', (req,res) =>{
    res.render('resetPassword.ejs')
})
router.put('/resetPassword', pasport.authenticate('local', {
    successRedirect: '/api/login',
    failureRedirect: 'resetPassword'
}))

module.exports = router;