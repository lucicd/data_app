const db = require('../connection');

function count(callback, search) {
  let sql='SELECT COUNT(*) AS count FROM countries';
  if (search) {
    sql += ' WHERE code ILIKE $1 OR name ILIKE $1';
  }
  db.one(sql, ['%'+search+'%'])
    .then(data => {
      callback(null, parseInt(data.count));
    })
    .catch(err => {
      callback(err);
    });
}

function getPaginated(callback, pageNo, pageSize, search, orderBy, orderDir) {
  const offset = (pageNo - 1) * pageSize;
  let sql = 'SELECT id, code, name FROM countries';
  if (search) {
    sql += ' WHERE code ILIKE $1 OR name ILIKE $1';
  }
  if (orderBy) {
    sql += ' ORDER BY $4~ ';
    if (orderDir && (orderDir.toUpperCase() === 'ASC' || orderDir.toUpperCase() === 'DESC')) {
      sql += ' ' + orderDir.toUpperCase();
    }
  } else {
    sql += ' ORDER BY code ASC';
  }
  sql += ' LIMIT $2 OFFSET $3';
  db.any(sql, ['%'+search+'%', pageSize, offset, orderBy])
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