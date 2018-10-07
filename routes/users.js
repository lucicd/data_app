const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');

router.get('/', (req, res, next) => {
  const renderParams = {
    title: 'Users', 
  };
  res.render('users/users-table', renderParams);
});

router.post('/get-records', (req, res, next) => {
  const requestParams = JSON.parse(req.body.request); 
  userModel.getRecords(requestParams, (err, users) => {
    if (err) {
      res.status(200).json({
        status: 'error',
        message: JSON.stringify(err),
      });
    } else {
      userModel.countRecords(requestParams, (err, count) => {
        if (err) {
          res.status(200).json({
            status: 'error',
            message: JSON.stringify(err),
          }); 
        } else {
          res.status(200).json({
            status: 'success',
            total: count.count,
            records: users,
          });
        }
      });
    }
  });
});

module.exports = router;