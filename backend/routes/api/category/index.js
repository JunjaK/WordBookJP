/* eslint-disable max-len */
/* eslint-disable global-require */
const express = require('express');
const createError = require('http-errors');

const router = express.Router();

router.get('/list', (req, res) => {
  const mysqlCon = require('../../../lib/dbConnect')();
  if (!req.headers.authorization) res.status(401).send({ success: false, msg: 'Unauthroized User!' });
  const {
    search, skip, limit, category, userid,
  } = req.query;
  const until = parseInt(skip, 10) + parseInt(limit, 10);
  let queryWord = '';
  let queryCnt = '';
  if (search === '' && category === '') {
    queryCnt = `select count(*) as cnt from word where userid = '${userid}' order by created desc `;
    queryWord = `select * from word where userid = '${userid}' order by created desc limit ${skip},${until}`;
  } else if (search === '') {
    queryCnt = `select count(*) as cnt from word where word.userid = '${userid}' and category = '${category}'  order by created desc `;
    queryWord = `select * from word where userid = '${userid}' and category = '${category}' order by created desc limit ${skip},${until}`;
  } else if (category === '') {
    queryCnt = `select count(*) as cnt from word where word.userid = '${userid}' and (mean like '%${search}%' or pronounce like '%${search}%') order by created desc `;
    queryWord = `select * from word where userid = '${userid}' and (mean like '%${search}%' or pronounce like '%${search}%') order by created desc limit ${skip},${until}`;
  } else {
    queryCnt = `select count(*) as cnt from word where word.userid = '${userid}' and category = '${category}' and (mean like '%${search}%' or pronounce like '%${search}%') order by created desc`;
    queryWord = `select * from word where userid = '${userid}' and category = '${category}' and (mean like '%${search}%' or pronounce like '%${search}%') order by created desc limit ${skip},${until}`;
  }
  mysqlCon.query(queryCnt, (e1, r1) => {
    console.log(e1);
    if (e1) {
      res.status(400).send({ success: false, msg: 'Wrong Request!!' });
    } else {
      mysqlCon.query(queryWord, (e2, r2) => {
        console.log(e2);
        if (e2) {
          res.status(400).send({ success: false, msg: 'Wrong Request!!' });
        } else {
          res.status(200).send({ success: true, r: { total: r1[0].cnt, list: r2 } });
          mysqlCon.end();
        }
      });
    }
  });
});

router.post('/save', async (req, res) => {
  const mysqlCon = require('../../../lib/dbConnect')();

  const word = req.body;
  if (!req.headers.authorization) res.status(401).send({ success: false, msg: 'Unauthroized User!' });
  let query = null;
  if (word.category === '') {
    query = `insert into word (word, mean, pronounce, userid)  values('${word.word}', '${word.mean}', '${word.pronounce}', '${word.userid}')`;
  } else {
    query = `insert into word (word, mean, pronounce, userid, category)  values('${word.word}', '${word.mean}', '${word.pronounce}', '${word.userid}', '${word.category}')`;
  }
  mysqlCon.query(query,
    (e1, r1) => {
      console.log(e1);
      if (e1) {
        res.status(400).send({ success: false, msg: 'Wrong Request!!' });
      } else {
        res.status(200).send({ success: true, msg: 'save word' });
        mysqlCon.end();
      }
    });
});


router.all('*', (req, res, next) => {
  next(createError(404, 'Wrong Url!'));
});

module.exports = router;
