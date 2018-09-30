const promise = require('bluebird');

const options = {
  promiseLib: promise,
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://postgres:Huntsman2017@127.0.0.1:5432/demo';
const db = pgp(connectionString);

module.exports = db;