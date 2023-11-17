const express = require('express');
const router = express.Router();

//auth dari jwt
const { auth } = require('../utils/jwt')

// const { get, getById, create, destroy } = 
//     require('../app/controller/users')
const controller = require('../app/controller')

// router.get('/users', get)
// router.get('/users/:id', getById)
// router.post('/users', create)
// router.delete('/users/:id', destroy)

// router.get('/users', controller.users.get)
// router.get('/users/:id', controller.users.getById)
// router.put('/users/:id', controller.users.update)
// router.post('/users', controller.users.create)
// router.delete('/users/:id', controller.users.destroy)

router.get('/v1/users', controller.usersV1.get)
router.get('/v1/users/:id', controller.usersV1.getById)
router.put('/v1/users/:id', controller.usersV1.update)
router.post('/v1/users', auth, controller.usersV1.create)
router.delete('/v1/users/:id', controller.usersV1.destroy)

module.exports = router;