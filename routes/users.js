const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');

router.get('/', (req, res, next) => {
  userModel.getAll((err, data) => {
    if (err) {
      console.log('ERROR:', err);
    } else {
      res.render('users', { title: 'Users', data: data });
    }
  });
});

module.exports = router;