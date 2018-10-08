const pgp = require('pg-promise')();

function buildWhereClause(requestParams, callback) {
  const clauseParams = {};
  let clause = '';
  if (requestParams.search && requestParams.search.length > 0) {
    clause = 'WHERE';
    for (let i = 0; i < requestParams.search.length; i++) {
      if (i > 0) {
        if (requestParams.searchLogic) {
          clause += ' ' + requestParams.searchLogic;
        } else {
          clause += ' OR';
        }
      }
      const searchField = requestParams.search[i];
      if (searchField.type === 'text') {
        if (searchField.operator === 'begins') {
          clause += ' $/searchFieldName' + i + 
            ':name/ ILIKE $/searchFieldValue' + i + '/';
          clauseParams['searchFieldName' + i] = searchField.field;
          clauseParams['searchFieldValue' + i] = searchField.value + '%';
        } else if (searchField.operator === 'ends') {
          clause += ' $/searchFieldName' + i + 
            ':name/ ILIKE $/searchFieldValue' + i + '/';
          clauseParams['searchFieldName' + i] = searchField.field;
          clauseParams['searchFieldValue' + i] = '%' + searchField.value;
        } else if (searchField.operator === 'contains') {
          clause += ' $/searchFieldName' + i + 
            ':name/ ILIKE $/searchFieldValue' + i + '/';
          clauseParams['searchFieldName' + i] = searchField.field;
          clauseParams['searchFieldValue' + i] = '%' + searchField.value + '%';
        } else if (searchField.operator === 'is') {
          clause += ' $/searchFieldName' + i + 
            ':name/ = $/searchFieldValue' + i + '/';
          clauseParams['searchFieldName' + i] = searchField.field;
          clauseParams['searchFieldValue' + i] = searchField.value;
        } else {
          throw('Unknow text search operator: ' + searchField.operator);
        }
      } else if (searchField.type === 'int') {
        if (searchField.operator === 'is') {
          clause += ' $/searchFieldName' + i + 
            ':name/ = $/searchFieldValue' + i + '/';
          clauseParams['searchFieldName' + i] = searchField.field;
          clauseParams['searchFieldValue' + i] = searchField.value;
        } else if (searchField.operator === 'between') {
          clause += ' ($/searchFieldName' + i + 
            ':name/ BETWEEN $/searchFieldValue' + i + 'A/ ' +
            'AND $/searchFieldValue' + i + 'B/)';
          clauseParams['searchFieldName' + i] = searchField.field;
          clauseParams['searchFieldValue' + i + 'A'] = searchField.value[0];
          clauseParams['searchFieldValue' + i + 'B'] = searchField.value[1];
        } else if (searchField.operator === 'less') {
          clause += ' $/searchFieldName' + i + 
            ':name/ < $/searchFieldValue' + i + '/';
          clauseParams['searchFieldName' + i] = searchField.field;
          clauseParams['searchFieldValue' + i] = searchField.value;
        } else if (searchField.operator === 'more') {
          clause += ' $/searchFieldName' + i + 
            ':name/ > $/searchFieldValue' + i + '/';
          clauseParams['searchFieldName' + i] = searchField.field;
          clauseParams['searchFieldValue' + i] = searchField.value;
        } else {
          throw('Unknow int search operator: ' + searchField.operator);
        }
      } else {
        throw('Unknow search field type: ' + searchField.type);
      }
    }
  }
  callback(clause, clauseParams);   
}

function buildOrderByClause(requestParams, callback) {
  let clause = '';
  const clauseParams = {};

  if (requestParams.sort && requestParams.sort.length > 0) {
    clause += 'ORDER BY $/sortField0:name/';
    clauseParams['sortField0'] = requestParams.sort[0].field;

    if (requestParams.sort[0].direction.toUpperCase() === 'ASC' || 
    requestParams.sort[0].direction.toUpperCase() === 'DESC') {
      clause += ' ' + requestParams.sort[0].direction.toUpperCase();
    }

    for (let i = 1; i < requestParams.sort.length; i++) {
      clause += ', $/sortField' + i + ':name/';
      clauseParams['sortField' + i] = requestParams.sort[i].field;
      if (requestParams.sort[i].direction.toUpperCase() === 'ASC' ||
      requestParams.sort[i].direction.toUpperCase() === 'DESC') {
        clause += ' ' + requestParams.sort[i].direction.toUpperCase();
      }
    }
  }
  callback(clause, clauseParams);
}

function buildLimitClause(requestParams, callback) {
  let clause = '';
  let clauseParams = {};

  if (requestParams.limit) {
    clause += 'LIMIT $/limit/';
    clauseParams.limit = requestParams.limit;
  }

  if (requestParams.offset) {
    clause += ' OFFSET $/offset/';
    clauseParams.offset = requestParams.offset;
  } else {
    clause += ' OFFSET 0';
  }

  callback(clause, clauseParams);  
}

function buildUpdateQuery(table, params, callback) {
  const changes = params.changes;
  if (changes && changes.length > 0) {
    const queries = [];
    for (let i = 0; i < changes.length; i++) {
      const change = changes[i];
      const queryParts = [];
      for (const field in change) {
        if (change.hasOwnProperty(field) && field != 'recid') {
          queryParts.push(pgp.as.format('$1:name', field) + ' = $/' + field + '/');
        }
      }
      queries.push({
        query: 'UPDATE ' + table + ' SET ' + queryParts.join(', ') + ' WHERE id = $/recid/',
        values: change,
      });
    }
    const sql = pgp.helpers.concat(queries);
    callback(null, sql);
  } else {
    callback('There are no changes to save.');
  }
}

function buildSearchQuery(table, requestParams, callback) {
  buildWhereClause(requestParams, (whereClause, whereParams) => {
    buildOrderByClause(requestParams, (orderByClause, orderByParams) => {
      buildLimitClause(requestParams, (limitClause, limitParams) => {
        let sql = table;
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
        const cmd = pgp.helpers.concat([{
          query: sql,
          values: namedParams,
        }]);
        callback(cmd);
      });
    });
  });
}

function buildCountQuery(table, requestParams, callback) {
  buildWhereClause(requestParams, (whereClause, whereParams) => {
    let sql = table;
    if (whereClause) {
      sql += ' ' + whereClause;
    }
    callback(sql);
  });
}

function buildDeleteQuery(table, params, callback) {
  const selected = params.selected;
  if (selected && selected.length > 0) {
    const sql = 'DELETE FROM ' + table + ' WHERE id IN ($1:list)';
    const cmd = pgp.helpers.concat([{
      query: sql,
      values: selected,
    }]);
    callback(null, cmd);
  } else {
    callback('There are no IDs in the list.');
  }
}

module.exports = {
  buildCountQuery: buildCountQuery,
  buildUpdateQuery: buildUpdateQuery,
  buildSearchQuery: buildSearchQuery,
  buildDeleteQuery: buildDeleteQuery,
};