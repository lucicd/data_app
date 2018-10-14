const db = require('../connection');
const helpers = require('../helpers/model-helpers');

function getRecords(params, callback) {
  helpers.buildSearchQuery('SELECT id, code, name FROM countries', params, sql => {
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
  helpers.buildCountQuery('SELECT COUNT(*) AS count FROM countries', params, sql => {
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
  helpers.buildDeleteQuery('countries', params, (err, sql) => {
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
  if (params.changes.recid > 0) {
    helpers.buildUpdateQuery('countries', params, (err, sql) => {
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
  } else {
    helpers.buildInsertQuery('countries', params, (err, sql) => {
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
  
}

module.exports = {
  getRecords: getRecords,
  saveRecords: saveRecords,
  deleteRecords: deleteRecords,
  countRecords: countRecords,
};