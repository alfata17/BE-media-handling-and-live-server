const express = require('express');
const router = express.Router();
// const { get, getById, create, destroy } = 
//     require('../app/controller/users')
const controller = require('../app/controller')

// router.get('/users', get)
// router.get('/users/:id', getById)
// router.post('/users', create)
// router.delete('/users/:id', destroy)

// router.get('/accounts', controller.accounts.get)
// router.get('/accounts/:id', controller.accounts.getById)
// router.put('/accounts/:id', controller.accounts.update)
// router.post('/accounts', controller.accounts.create)
// router.delete('/accounts/:id', controller.accounts.destroy)

router.get('/v1/accounts', controller.accountsV1.get)
router.get('/v1/accounts/:id', controller.accountsV1.getById)
router.put('/v1/accounts/:id', controller.accountsV1.update)
router.post('/v1/accounts', controller.accountsV1.create)
router.delete('/v1/accounts/:id', controller.accountsV1.destroy)

module.exports = router;