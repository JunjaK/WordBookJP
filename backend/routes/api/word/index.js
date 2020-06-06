const express = require('express');
const createError = require('http-errors');
const mysqlCon = require('../../../lib/dbConnect')();

const router = express.Router();


router.post('/add', async (req, res) => {
  const word = req.body;
  if (!req.headers.authorization) res.status(401).send({ success: false, msg: 'Unauthroized User!' });
  mysqlCon.query(`insert into word   values '${word.word}'`, (e1, r1) => {
    if (r1.length === 0) {
      res.status(400).send({ success: false, msg: 'Wrong Request!!' });
    } else {
      res.status(200).send({ success: true, r: { id: r1[0].id, nickname: r1[0].nickname, email: r1[0].email } });
    }
  });
  mysqlCon.end();
});

router.all('*', (req, res, next) => {
  next(createError(404, 'Wrong Url!'));
});

module.exports = router;
