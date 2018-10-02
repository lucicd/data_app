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
  let pageNo = req.query.pageno || 1;
  if (pageNo <= 0) pageNo = 1;
  const pageSize = req.query.pagesize || 10;
  const search = req.query.search;
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
  userModel.add(user, (err) => {
    if (err) {
      next(err);
    } else {
      res.redirect('/');
    }
  })
});

module.exports = router;