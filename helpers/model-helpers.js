function buildWhereClause(bodyParams, callback) {
  const clauseParams = {};
  let clause = '';
  if (bodyParams.search && bodyParams.search.length > 0) {
    clause = 'WHERE';
    for (let i = 0; i < bodyParams.search.length; i++) {
      if (i > 0) {
        if (bodyParams.searchLogic) {
          clause += ' ' + bodyParams.searchLogic;
        } else {
          clause += ' OR';
        }
      }
      const searchField = bodyParams.search[i];
      if (searchField.type === 'text') {
        if (searchField.operator === 'begins') {
          clause += ' $/searchFieldName' + i + 
            ':name/ ILIKE $/searchFieldValue' + i + '/';
          clauseParams['searchFieldName' + i] = searchField.field;
          clauseParams['searchFieldValue' + i] = searchField.value + '%';
        } else {
          clause += ' $/searchFieldName' + i + 
            ':name/ = $/searchFieldValue' + i + '/';
          clauseParams['searchFieldName' + i] = searchField.field;
          clauseParams['searchFieldValue' + i] = searchField.value;
        }
      }
    }
  }
  callback(clause, clauseParams);   
}

function buildOrderByClause(bodyParams, callback) {
  let clause = '';
  const clauseParams = {};

  if (bodyParams.sort && bodyParams.sort.length > 0) {
    clause += 'ORDER BY $/sortField0:name/';
    clauseParams['sortField0'] = bodyParams.sort[0].field;

    if (bodyParams.sort[0].direction.toUpperCase() === 'ASC' || 
    bodyParams.sort[0].direction.toUpperCase() === 'DESC') {
      clause += ' ' + bodyParams.sort[0].direction.toUpperCase();
    }

    for (let i = 1; i < bodyParams.sort.length; i++) {
      clause += ', $/sortField' + i + ':name/';
      clauseParams['sortField' + i] = bodyParams.sort[i].field;
      if (bodyParams.sort[i].direction.toUpperCase() === 'ASC' ||
      bodyParams.sort[i].direction.toUpperCase() === 'DESC') {
        clause += ' ' + bodyParams.sort[i].direction.toUpperCase();
      }
    }
  }
  callback(clause, clauseParams);
}

function buildLimitClause(bodyParams, callback) {
  let clause = '';
  let clauseParams = {};

  if (bodyParams.limit) {
    clause += 'LIMIT $/limit/';
    clauseParams.limit = bodyParams.limit;
  }

  if (bodyParams.offset) {
    clause += ' OFFSET $/offset/';
    clauseParams.offset = bodyParams.offset;
  } else {
    clause += ' OFFSET 0';
  }

  callback(clause, clauseParams);  
}

module.exports = {
  buildWhereClause: buildWhereClause,
  buildOrderByClause: buildOrderByClause,
  buildLimitClause: buildLimitClause,
};