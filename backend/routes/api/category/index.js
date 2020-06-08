/* eslint-disable max-len */
/* eslint-disable global-require */
const express = require('express');
const createError = require('http-errors');

const router = express.Router();

router.get('/list', (req, res) => {
  const mysqlCon = require('../../../lib/dbConnect')();
  if (!req.headers.authorization) res.status(401).send({ success: false, msg: 'Unauthroized User!' });
  mysqlCon.query('select * from categories', (e1, r1) => {
    console.log(e1);
    if (e1) {
      res.status(400).send({ success: false, msg: 'Wrong Request!!' });
    } else {
      res.status(200).send({ success: true, r: r1 });
      mysqlCon.end();
    }
  });
});

router.post('/add', async (req, res) => {
  const mysqlCon = require('../../../lib/dbConnect')();
  if (!req.headers.authorization) res.status(401).send({ success: false, msg: 'Unauthroized User!' });
  mysqlCon.query(`insert into categories (category) values('${req.body.category}');`,
    (e1, r1) => {
      console.log(e1);
      if (e1) {
        res.status(400).send({ success: false, msg: 'Wrong Request!!' });
      } else {
        res.status(200).send({ success: true, msg: 'Add Category' });
        mysqlCon.end();
      }
    });
});


router.all('*', (req, res, next) => {
  next(createError(404, 'Wrong Url!'));
});

module.exports = router;
