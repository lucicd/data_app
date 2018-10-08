const db = require('../connection');
const helpers = require('../helpers/model-helpers');
const bcrypt = require('bcryptjs');

function getRecords(params, callback) {
  helpers.buildSearchQuery('SELECT id, username, email, role FROM users', params, sql => {
    db.any(sql)
      .then(data => {
        callback(null, data);
      })
      .catch(err => {
        callback(err);
      });
  });
}

function countRecords(params, callback) {
  helpers.buildCountQuery('SELECT COUNT(*) AS count FROM users', params, sql => {
    db.one(sql)
      .then(data => {
        callback(null, data);
      })
      .catch(err => {
        callback(err);
      });
  });
}

function deleteRecords(params, callback) {
  const selected = params.selected;
  helpers.buildDeleteQuery('users', params, (err, sql) => {
    if (err) {
      callback(err);
    } else {
      db.none(sql)
        .then(() => {
          callback(null);
        })
        .catch(err => {
          callback(err);
        });
    }
  });
}

function saveRecords(params, callback) {
  helpers.buildUpdateQuery('users', params, (err, sql) => {
    if (err) {
      callback(err);
    } else {
      db.none(sql)
        .then(() => {
          callback(null);
        })
        .catch(err => {
          callback(err);
        });
    }
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
  saveRecords: saveRecords,
  deleteRecords: deleteRecords,
  countRecords: countRecords,
  add: add,
};