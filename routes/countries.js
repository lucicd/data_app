const express = require('express');
const router = express.Router();
const countryModel = require('../models/country-model');
const url = require('url');

function checkValidity(rec, callback) {
  const problems = [];
  if (!rec.code) {
    problems.push({column: 'code', description: 'Country code is required.'});
  }
  if (!rec.name) {
    problems.push({column: 'code', description: 'Country name is required.'});
  }
  callback(problems);
}

function renderTable(res, params) {
  res.render('countries/countries-table', params);
}

function redirectToTable(res, params) {
  const url1 = url.format({
    pathname: '',
    query: params,
  });
  console.log('Redirecting to ' + url1);
  res.redirect(url1);
}

function renderForm(res, params) {
  res.render('countries/countries-form', params);
}

router.get('/', (req, res, next) => {
  renderTable(res, { title: 'Countries' });
});

router.get('/add', (req, res, next) => {
  renderForm(res, {
    title: 'Add country',
    rec: { _method: 'post' },
  });
});

router.get('/edit', (req, res, next) => {
  const id = parseInt(req.query.id);
  countryModel.getById(id, (err, data) => {
    if (err) {
      next(err);
    } else {
      data._method = 'put';
      renderForm(res, {
        title: 'Edit country',
        rec: data,
      });
    }
  });
});

router.get('/delete', (req, res, next) => {
  const id = parseInt(req.query.id);
  countryModel.getById(id, (err, data) => {
    if (err) {
      next(err);
    } else {
      data._method = 'delete';
      renderForm(res, {
        title: 'Delete country',
        rec: data,
      });
    }
  });
});

router.post('/', (req, res, next) => {
  console.log('params are ', req.body);
  checkValidity(req.body, problems => {
    if (problems.length > 0) {
      renderForm(res, {
        title: req.body._method === 'put' ? 'Edit country' : 'Add country',
        rec: req.body,
        problems: problems,
      });
    } else {
      if (req.body._method === 'put') {
        countryModel.update(req.body, (err, data) => {
          if (err) {
            renderForm(res, {
              title: 'Edit country',
              rec: req.body,
              err: err,
            });
          } else {
            redirectToTable(res, {
              id: data.id,
            });
          }
        });
      } else if (req.body._method === 'delete') {
        countryModel.destroy(req.body, (err, data) => {
          if (err) {
            renderForm(res, {
              title: 'Delete country',
              rec: req.body,
              err: err,
            });
          } else {
            redirectToTable(res, {
              id: data.id,
            });
          }
        });
      } else {
        countryModel.insert(req.body, (err, data) => {
          if (err) {
            renderForm(res, {
              title: 'Add country',
              rec: req.body,
              err: err,
            });
          } else {
            redirectToTable(res, {
              id: data.id,
            });
          }
        });
      }
    }
  });
});

router.get('/data', (req, res, next) => {
  let pageNo = parseInt(req.query.pageno || 1);
  if (pageNo <= 0) pageNo = 1;
  const pageSize = parseInt(req.query.pagesize || 10);
  const search = req.query.search;
  const orderBy = req.query.orderby;
  const orderDir = req.query.orderdir;
  countryModel.getPaginated((err, countries) => {
    if (err) {
      next(err);
    } else {
      countryModel.count((err, count) => {
        if (err) {
          next(err);
        } else {
          const params = {
            search: search,
            rows: countries, 
            count: count,
            pageNo: pageNo,
            pageSize: pageSize,
            orderBy: orderBy,
            orderDir: orderDir,
            totalPages: Math.ceil(count / pageSize),
          };
          res.status(200).json(params);
        }
      }, search);
    }
  }, pageNo, pageSize, search, orderBy, orderDir);
});

module.exports = router;