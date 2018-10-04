const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');

router.get('/', (req, res, next) => {
  const renderParams = {
    title: 'Users', 
  };
  res.render('users/users-table', renderParams);
});

router.get('/data', (req, res, next) => {
  let pageNo = parseInt(req.query.pageno || 1);
  if (pageNo <= 0) pageNo = 1;
  const pageSize = parseInt(req.query.pagesize || 10);
  const search = req.query.search;
  const orderBy = req.query.orderby;
  const orderDir = req.query.orderdir;
  userModel.getPaginated((err, users) => {
    if (err) {
      next(err);
    } else {
      userModel.count((err, count) => {
        if (err) {
          next(err);
        } else {
          const params = {
            search: search,
            rows: users, 
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

router.post('/', (req, res, next) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
  userModel.add(user, (err) => {
    if (err) {
      next(err);
    } else {
      res.redirect('/');
    }
  })
});

router.post('/get-records', (req, res, next) => {
  userModel.getRecords(JSON.parse(req.body.request), (err, users) => {
    if (err) {
      res.status(200).json({
        status: 'error',
        message: JSON.stringify(err),
      });
    } else {
      res.status(200).json({
        status: 'success',
        total: users.length,
        records: users,
      });
    }
  });
});

module.exports = router;