const db = require('../connection');
const bcrypt = require('bcryptjs');

function getAll(callback) {
  db.any('SELECT username FROM users')
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback(err);
    });
}

function getByName(username, callback) {
  db.one('SELECT * FROM users WHERE username = $1', username)
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback(err);
    });
}

function add(user, callback) {
  console.log(user);
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
  getAll: getAll,
  getByName: getByName,
  add: add,
};