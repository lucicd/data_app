const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');

// router.get('/:pageno/:pagesize', (req, res, next) => {
router.get('/', (req, res, next) => {
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
          const renderParams = {
            title: 'Users', 
            search: search,
            users: users, 
            count: count.count,
            pageNo: pageNo * 1,
            pageSize: pageSize * 1,
            totalPages: Math.ceil(count.count / pageSize),
          };
          console.log(renderParams.count);
          res.render('users/users-table', renderParams);
        }
      });
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