// const users = require('./users');
// const accounts = require('./accounts');
// const transactions = require('./transactions');

const usersV1 = require('./api/v1/users');
const accountsV1 = require('./api/v1/accounts');
const profilesV1 = require('./api/v1/profiles');
const transactionV1 = require('./api/v1/transactions');
const auth = require('./api/v1/auth');
const media = require('./api/v1/media');
const resetPassword = require('./api/v1/resetPassword');
const lupaPassword = require('./api/v1/lupaPassword');



module.exports = {
    // users,
    // accounts,
    // transactions
    usersV1,
    accountsV1,
    profilesV1,
    transactionV1,
    auth,
    media,
    resetPassword,
    lupaPassword
}