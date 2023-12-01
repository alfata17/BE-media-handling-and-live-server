const express = require('express');
const router = express.Router();

const controller = require('../app/controller');
const { lupaP } = require('../app/controller/api/v1/lupaPassword');

router.post('/v1/lupaPassword', controller.lupaPassword.lupaP)
router.get('/lupaPassword', (req,res) =>{
    res.render('login.ejs')
})

module.exports = router;