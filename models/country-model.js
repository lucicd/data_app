const db = require('../connection');

function count(callback, search) {
  let sql='SELECT COUNT(*) FROM countries';
  if (search) {
    sql += ' WHERE code ILIKE $1 OR name ILIKE $1';
  }
  db.one(sql, ['%'+search+'%'])
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback(err);
    });
}

function getPaginated(callback, pageNo, pageSize, search) {
  const offset = (pageNo - 1) * pageSize;
  let sql = 'SELECT id, code, name FROM countries';
  if (search) {
    sql += ' WHERE code ILIKE $1 OR name ILIKE $1';
  }
  sql += ' ORDER BY id LIMIT $2 OFFSET $3';
  db.any(sql, ['%'+search+'%', pageSize, offset])
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback(err);
    });
}

module.exports = {
  getPaginated: getPaginated,
  count: count,
};