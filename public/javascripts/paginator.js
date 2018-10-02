(function() {
  var app = window.APP = window.APP || {};

  var paginatorState = {
    search: '',
    pageNo: 1,
    pageSize: 10,
    count: 0,
    totalPages: 0,
  };

  function updatePaginatorStatus(newStatus) {
    paginatorState.search = newStatus.search;
    paginatorState.pageNo = newStatus.pageNo;
    paginatorState.pageSize = newStatus.pageSize;
    paginatorState.count = newStatus.count
    paginatorState.totalPages = newStatus.totalPages;
  }

  function getData(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        updatePaginatorStatus(response);
        var rows = response.rows;
        var dataTable = document.getElementById(paginatorState.tableId);
        dataTable.innerHTML = '';
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          var tr = paginatorState.createTableRow(row);
          dataTable.appendChild(tr);
        }
        document.getElementById('pageNoInput').value = response.pageNo;
        document.getElementById('totalPagesSpan').innerHTML = 
          '&nbsp;of&nbsp;' + response.totalPages;
        document.getElementById('totalRecordsSpan').innerHTML = 
          '&nbsp;Records:&nbsp;' + response.count;
        document.getElementById('pageNoInput').setAttribute('max', response.totalPages);
        callback();
      }
    };
    var uri = paginatorState.uri;
    uri += '?search=' + encodeURI(paginatorState.search);
    uri += '&pageno=' + encodeURI(paginatorState.pageNo);
    uri += '&pagesize=' + encodeURI(paginatorState.pageSize);
    uri += '&orderby=' + encodeURI(paginatorState.orderBy);
    uri += '&orderdir=' + encodeURI(paginatorState.orderDir);

    xhttp.open('GET', uri, true);
    xhttp.send();
  }

  var firstPageBtn = document.getElementById('firstPageBtn');
  firstPageBtn.onclick = function() {
    paginatorState.pageNo = 1;
    getData(function() {
      console.log(paginatorState);
    });
  }

  var prevPageBtn = document.getElementById('prevPageBtn');
  prevPageBtn.onclick = function() {
    paginatorState.pageNo = Math.max(paginatorState.pageNo - 1, 1);
    getData(function() {
      console.log(paginatorState);
    });
  }
  
  var nextPageBtn = document.getElementById('nextPageBtn');
  nextPageBtn.onclick = function() {
    paginatorState.pageNo = Math.min(paginatorState.pageNo + 1, paginatorState.totalPages);
    getData(function() {
      console.log(paginatorState);
    });
  }

  var lastPageBtn = document.getElementById('lastPageBtn');
  lastPageBtn.onclick = function() {
    paginatorState.pageNo = paginatorState.totalPages;
    getData(function() {
      console.log(paginatorState);
    });
  }

  var searchInput = document.getElementById('searchInput');
  searchInput.onchange = function() {
    paginatorState.search = searchInput.value;
    paginatorState.pageNo = 1;
    getData(function() {
      console.log(paginatorState);
    });
  }

  var pageNoInput = document.getElementById('pageNoInput');
  pageNoInput.onchange = function() {
    paginatorState.pageNo = pageNoInput.value;
    getData(function() {
      console.log(paginatorState);
    });
  }

  var pageSizeSelect = document.getElementById('pageSizeSelect');
  pageSizeSelect.onchange = function() {
    paginatorState.pageSize = pageSizeSelect.value;
    getData(function() {
      console.log(paginatorState);
    });
  }

  var orderBySelect = document.getElementById('orderBySelect');
  orderBySelect.onchange = function() {
    var sortableColumn = paginatorState.sortableColumns[orderBySelect.value];
    paginatorState.orderBy = sortableColumn.column;
    paginatorState.orderDir = sortableColumn.direction;
    getData(function() {
      console.log(paginatorState);
    });
  }

  app.startPaginator = function(config, callback) {
    paginatorState.tableId = config.tableId;
    paginatorState.createTableRow = config.createTableRow;
    paginatorState.uri = config.uri;
    if (config.sortableColumns) {
      paginatorState.sortableColumns = config.sortableColumns;
      paginatorState.orderBy = config.sortableColumns[0].column;
      paginatorState.orderDir = config.sortableColumns[0].direction;
      var orderBySelect = document.getElementById('orderBySelect');
      for (var i = 0; i < config.sortableColumns.length; i++) {
        var sortableColumn = config.sortableColumns[i];
        var option = document.createElement('option');
        option.innerHTML = sortableColumn.name + ' ' + sortableColumn.direction;
        option.setAttribute('value', i);
        orderBySelect.appendChild(option);
      }
    }
    getData(callback);
  };
})();