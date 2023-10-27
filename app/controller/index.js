// const users = require('./users');
// const accounts = require('./accounts');
// const transactions = require('./transactions');

const usersV1 = require('./api/v1/users');
const accountsV1 = require('./api/v1/accounts');
const profilesV1 = require('./api/v1/profiles');
const transactionV1 = require('./api/v1/transactions');


module.exports = {
    // users,
    // accounts,
    // transactions
    usersV1,
    accountsV1,
    profilesV1,
    transactionV1
}