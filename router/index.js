const express = require('express');
const router = express.Router();

const users = require('./users');
const accounts = require('./accounts');
const profiles = require('./profiles');
const transactions = require('./transactions');

router.use(users);
router.use(accounts);
router.use(profiles);
router.use(transactions);
// router.use()

module.exports = router;