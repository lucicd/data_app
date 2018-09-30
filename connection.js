const promise = require('bluebird');
const connectionString = require('./secrets').connectionString;

const options = {
  promiseLib: promise,
};

const pgp = require('pg-promise')(options);
const db = pgp(connectionString);

module.exports = db;