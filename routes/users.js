const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');

router.get('/', (req, res, next) => {
  userModel.getAll((err, data) => {
    if (err) {
      next(err);
    } else {
      res.render('users', { title: 'Users', data: data });
    }
  });
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