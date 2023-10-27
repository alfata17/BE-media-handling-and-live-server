const express = require('express');
const router = express.Router();
// const { get, getById, create, destroy } = 
//     require('../app/controller/users')
const controller = require('../app/controller')

// router.get('/users', get)
// router.get('/users/:id', getById)
// router.post('/users', create)
// router.delete('/users/:id', destroy)

router.get('/v1/transactions', controller.transactionV1.get)
router.get('/v1/transactions/:id', controller.transactionV1.getById)
router.post('/v1/transactions', controller.transactionV1.create)
router.delete('/v1/transactions/:id', controller.transactionV1.destroy)

module.exports = router;