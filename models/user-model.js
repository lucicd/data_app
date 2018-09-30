const db = require('../connection');

function getAll(callback) {
  db.any('SELECT * FROM users')
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback(err);
    });
}

module.exports = {
  getAll: getAll,
};