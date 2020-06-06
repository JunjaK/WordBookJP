const express = require('express');
const createError = require('http-errors');
const mysqlCon = require('../../../lib/dbConnect')();

const router = express.Router();


router.post('/save', async (req, res) => {
  const word = req.body;
  if (!req.headers.authorization) res.status(401).send({ success: false, msg: 'Unauthroized User!' });
  mysqlCon.query(`insert into word (word, mean, pronounce, userid, category )  values '${word.word}', '${word.mean}', '${word.pronounce}', '${word.userid}', '${word.category}'`,
    (e1, r1) => {
      console.log(r1);
      if (e1) {
        res.status(400).send({ success: false, msg: 'Wrong Request!!' });
      } else {
        res.status(200).send({ success: true, msg: 'save word' });
      }
    });
  mysqlCon.end();
});


router.all('*', (req, res, next) => {
  next(createError(404, 'Wrong Url!'));
});

module.exports = router;
