const express = require('express');
const router = express.Router();
const countryModel = require('../models/country-model');

router.get('/', (req, res, next) => {
  const renderParams = {
    title: 'Countries', 
  };
  res.render('countries/countries-table', renderParams);
});

router.get('/data', (req, res, next) => {
  let pageNo = req.query.pageno || 1;
  if (pageNo <= 0) pageNo = 1;
  const pageSize = req.query.pagesize || 10;
  const search = req.query.search;
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
            count: parseInt(count.count),
            pageNo: parseInt(pageNo),
            pageSize: parseInt(pageSize),
            totalPages: Math.ceil(count.count / pageSize),
          };
          res.status(200).json(params);
        }
      }, search);
    }
  }, pageNo, pageSize, search);
});

router.post('/', (req, res, next) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
  countryModel.add(user, (err) => {
    if (err) {
      next(err);
    } else {
      res.redirect('/');
    }
  })
});

module.exports = router;