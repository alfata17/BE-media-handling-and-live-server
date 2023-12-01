const express = require('express');
const router = express.Router();

const users = require('./users');
const accounts = require('./accounts');
const profiles = require('./profiles');
const transactions = require('./transactions');
const auth = require('./auth');
const media = require('./media');
const resetPassword = require('./resetPassword');


router.use(users);
router.use(accounts);
router.use(profiles);
router.use(transactions);
router.use(auth);
router.use(media);
router.use(resetPassword);

// router.use()

module.exports = router;