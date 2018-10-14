const db = require('../connection');
const pgp = require('pg-promise')();

function getByKey(key, callback) {
  const sql = 'SELECT id, abbreviation, name FROM regions WHERE id = $1';
  db.oneOrNone(sql, key)
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback(err);
    });
}

function buildWhereClause(params) {
  const clauseParts = [];
  if (params.search) {
    clauseParts.push(pgp.as.format(
      'WHERE abbreviation ILIKE $1 OR name ILIKE $1', 
      '%' + params.search + '%'));
  }
  return clauseParts.join(' ');
}

function buildOrderByClause(params) {
  const clauseParts = [];
  if (params.orderBy) {
    clauseParts.push(pgp.as.format(
      'ORDER BY $1:name', params.orderBy));
    if (params.orderDir) {
      const orderDir = params.orderDir.toUpperCase();
      if (orderDir === 'ASC' || orderDir === 'DESC') {
        clauseParts.push(orderDir);
      }
    } 
  }
  return clauseParts.join(' ');
}

function buildLimitClause(params) {
  const clauseParts = [];
  if (params.limit) {
    clauseParts.push(pgp.as.format(
      'LIMIT $1', params.limit));
  }
  if (params.offset) {
    clauseParts.push(pgp.as.format(
      'OFFSET $1', params.offset));
  }
  return clauseParts.join(' ');
}

function query(params, callback) {
  const queryParts = [];
  queryParts.push('SELECT id, abbreviation, name FROM regions');
  queryParts.push(buildWhereClause(params));
  queryParts.push(buildOrderByClause(params));
  queryParts.push(buildLimitClause(params));
  db.any(queryParts.join(' '))
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback(err);
    });
}

function count(params, callback) {
  const queryParts = [];
  queryParts.push('SELECT count(*) as count FROM regions');
  queryParts.push(buildWhereClause(params));
  db.one(queryParts.join(' '))
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback(err);
    });
}

function checkReferentialIntegrity(key, callback) {
  callback(null);
}

function destroy(key, callback) {
  checkReferentialIntegrity(key, err => {
    if (err) {
      callback(err);
    } else {
      const sql = 'DELETE FROM regions WHERE id = $1';
      db.none(sql, key)
        .then(() => {
          callback(null);
        })
        .catch(err => {
          callback(err);
        });
    }
  });
}

module.exports = {
  getByKey: getByKey,
  query: query,
  count: count,
  destroy: destroy,
};