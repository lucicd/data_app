const express = require('express');
const router = express.Router();
const regionModel = require('../models/region-model');

router.get('/', (req, res, next) => {
  regionModel.query(req.query, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.json({
        status: 'ok',
        data: data,
      });
    }
  });
});

router.get('/count', (req, res, next) => {
  regionModel.count(req.query, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.json({
        status: 'ok',
        data: data,
      });
    }
  });
});

router.get('/:id', (req, res, next) => {
  regionModel.getByKey(req.params.id, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.json({
        status: 'ok',
        data: data,
      });
    }
  });
});

router.delete('/:id', (req, res, next) => {
  regionModel.destroy(req.params.id, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.json({
        status: 'ok',
      });
    }
  });
});

module.exports = router;