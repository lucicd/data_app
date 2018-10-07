const db = require('../connection');
const helpers = require('../helpers/model-helpers');
const bcrypt = require('bcryptjs');

function buildSearchQuery(requestParams, callback) {
  helpers.buildWhereClause(requestParams, (whereClause, whereParams) => {
    helpers.buildOrderByClause(requestParams, (orderByClause, orderByParams) => {
      helpers.buildLimitClause(requestParams, (limitClause, limitParams) => {
        let sql = 'SELECT id, username, email, role FROM users';
        if (whereClause) {
          sql += ' ' + whereClause;
        }
        if (orderByClause) {
          sql += ' ' + orderByClause;
        }
        if (limitClause) {
          sql += ' ' + limitClause;
        }
        const namedParams = {...whereParams, ...orderByParams, ...limitParams};
        callback(sql, namedParams);
      });
    });
  });
}

function buildCountQuery(requestParams, callback) {
  helpers.buildWhereClause(requestParams, (whereClause, whereParams) => {
    let sql = 'SELECT COUNT(*) AS count FROM users';
    if (whereClause) {
      sql += ' ' + whereClause;
    }
    callback(sql, whereParams);
  });
}

function getRecords(params, callback) {
  buildSearchQuery(params, (sql, namedParams) => {
    db.any(sql, namedParams)
      .then(data => {
        callback(null, data);
      })
      .catch(err => {
        callback(err);
      });
  });
}

function countRecords(params, callback) {
  buildCountQuery(params, (sql, namedParams) => {
    db.one(sql, namedParams)
      .then(data => {
        callback(null, data);
      })
      .catch(err => {
        callback(err);
      });
  });
}

function add(user, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      callback(err);
    } else {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          callback(err);
        } else {
          db.none(
            'INSERT INTO users(username, password) VALUES($1, $2)', 
            [user.username, hash])
            .then(() => { callback(null); })
            .catch(err => { callback(err); });
        }
      });
    }
  });
}

module.exports = {
  getRecords: getRecords,
  countRecords: countRecords,
  add: add,
};