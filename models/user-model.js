const db = require('../connection');
const bcrypt = require('bcryptjs');

function buildQuery(params, callback) {
  let sql = 'SELECT id, username, email, role FROM users';
  var namedParams = {};
  
  if (params.sort && params.sort.length > 0) {
    sql += ' ORDER BY $/sort_field0:name/';
    namedParams['sort_field0'] =  params.sort[0].field;
    if (params.sort[0].direction === 'asc' || params.sort[0].direction === 'desc') {
      sql += ' ' + params.sort[0].direction.toUpperCase();
    }
    for (let i = 1; i < params.sort.length; i++) {
      sql += ', $/sort_field' + i + ':name/';
      namedParams['sort_field' + i] =  params.sort[i].field;
      if (params.sort[i].direction === 'asc' || params.sort[i].direction === 'desc') {
        sql += ' ' + params.sort[i].direction.toUpperCase();
      }
    }
  }

  if (params.limit) {
    sql += ' LIMIT $/limit/';
    namedParams.limit = params.limit;
  }
  if (params.offset) {
    sql += ' OFFSET $/offset/';
    namedParams.offset = params.offset;
  }
  callback(sql, namedParams);
}

function getRecords(params, callback) {
  console.log(params);
  let sql = buildQuery(params, (sql, namedParams) => {
    db.any(sql, namedParams)
      .then(data => {
        callback(null, data);
      })
      .catch(err => {
        callback(err);
      });
  });
}

function count(callback, search) {
  let sql='SELECT COUNT(*) AS count FROM users';
  if (search) {
    sql += ' WHERE username ILIKE $1 OR email ILIKE $1 OR role ILIKE $1';
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
  let sql = 'SELECT id, username, email, role FROM users';
  if (search) {
    sql += ' WHERE username ILIKE $1 OR email ILIKE $1 OR role ILIKE $1';
  }
  if (orderBy) {
    sql += ' ORDER BY $4~ ';
    if (orderDir && (orderDir.toUpperCase() === 'ASC' || orderDir.toUpperCase() === 'DESC')) {
      sql += ' ' + orderDir.toUpperCase();
    }
  } else {
    sql += ' ORDER BY username ASC';
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
  getPaginated: getPaginated,
  getByName: getByName,
  getRecords: getRecords,
  add: add,
  count: count,
};