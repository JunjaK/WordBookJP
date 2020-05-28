const express = require('express');
const createError = require('http-errors');

const router = express.Router();


router.all('*', (req, res, next) => {
  next(createError(404, 'Wrong Url!'));
});

module.exports = router;
