const express = require('express');
const router = express.Router();
const countryModel = require('../models/country-model');

router.get('/', (req, res, next) => {
  const renderParams = {
    title: 'Countries', 
  };
  res.render('countries/countries-table', renderParams);
});

function getRecords(requestParams, res) {
  countryModel.getRecords(requestParams, (err, users) => {
    if (err) {
      res.json({
        status: 'error',
        message: JSON.stringify(err),
      });
    } else {
      countryModel.countRecords(requestParams, (err, count) => {
        if (err) {
          res.json({
            status: 'error',
            message: JSON.stringify(err),
          }); 
        } else {
          res.json({
            status: 'success',
            total: count.count,
            records: users,
          });
        }
      });
    }
  });
}

function deleteRecords(requestParams, res) {
  countryModel.deleteRecords(requestParams, err => {
    if (err) {
      res.json({
        status: 'error',
        message: JSON.stringify(err),
      });
    } else {
      res.json({
        status: 'success',
      });
    }
  });
}

function saveRecords(requestParams, res) {
  countryModel.saveRecords(requestParams, err => {
    if (err) {
      res.json({
        status: 'error',
        message: JSON.stringify(err),
      });
    } else {
      res.json({
        status: 'success',
      });
    }
  });
}

router.post('/', (req, res, next) => {
  const requestParams = JSON.parse(req.body.request);
  console.log(requestParams);
  if (requestParams.cmd === 'get') {
    getRecords(requestParams, res);
  } else if (requestParams.cmd === 'delete') {
    deleteRecords(requestParams, res);
  } else if (requestParams.cmd === 'save') {
    saveRecords(requestParams, res);
  } else {
    res.json({
      status: 'error',
      message: 'Unknow command: ' + requestParams.cmd,
    }); 
  }
});

module.exports = router;