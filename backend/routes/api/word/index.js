/* eslint-disable max-len */
/* eslint-disable global-require */
const express = require('express');
const createError = require('http-errors');

const router = express.Router();

router.get('/dummy', (req, res) => {
  const mysqlCon = require('../../../lib/dbConnect')();
  if (!req.headers.authorization) res.status(401).send({ success: false, msg: 'Unauthroized User!' });
  console.log(req.user.id);
  for (let i = 0; i < 5000; i += 1) {
    const query = `insert into word (word, mean, pronounce, userId)  values('単語${i}', '의미${i}', 'はつおん${i}', '${req.user.id}')`;
    mysqlCon.query(query, (e1, r1) => {
      if (e1) {
        console.log(e1);
        res.status(400).send({ success: false, msg: 'Wrong Request!!' });
      }
    });
  }
  res.status(200).send({ success: true, msg: 'Successfully create dummy data' });
});

router.get('/list', (req, res) => {
  const mysqlCon = require('../../../lib/dbConnect')();
  if (!req.headers.authorization) res.status(401).send({ success: false, msg: 'Unauthroized User!' });
  const {
    search, skip, limit, category, userId,
  } = req.query;
  let queryWord = '';
  let queryCnt = '';
  if (search === '' && category === '') {
    queryCnt = `select count(*) as cnt from word where userId = '${userId}' order by created desc;`;
    queryWord = `select * from word where userId = '${userId}' order by created desc limit ${skip}, ${limit};`;
  } else if (search === '') {
    queryCnt = `select count(*) as cnt from word where word.userId = '${userId}' and category = '${category}'  order by created desc;`;
    queryWord = `select * from word where userId = '${userId}' and category = '${category}' order by created desc limit ${skip}, ${limit};`;
  } else if (category === '') {
    queryCnt = `select count(*) as cnt from word where word.userId = '${userId}' and (mean like '%${search}%' or pronounce like '%${search}%') order by created desc;`;
    queryWord = `select * from word where userId = '${userId}' and (mean like '%${search}%' or pronounce like '%${search}%') order by created desc limit ${skip}, ${limit};`;
  } else {
    queryCnt = `select count(*) as cnt from word where word.userId = '${userId}' and category = '${category}' and (mean like '%${search}%' or pronounce like '%${search}%') order by created desc;`;
    queryWord = `select * from word where userId = '${userId}' and category = '${category}' and (mean like '%${search}%' or pronounce like '%${search}%') order by created desc limit ${skip}, ${limit};`;
  }
  mysqlCon.query(queryCnt, (e1, r1) => {
    if (e1) {
      console.log(e1);
      res.status(400).send({ success: false, msg: 'Wrong Request!!' });
    } else {
      mysqlCon.query(queryWord, (e2, r2) => {
        if (e2) {
          console.log(e2);
          res.status(400).send({ success: false, msg: 'Wrong Request!!' });
        } else {
          mysqlCon.end();
          res.status(200).send({ success: true, r: { total: r1[0].cnt, list: r2 } });
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
    query = `insert into word (word, mean, pronounce, userId)  values('${word.word}', '${word.mean}', '${word.pronounce}', '${word.userId}')`;
  } else {
    query = `insert into word (word, mean, pronounce, userId, category)  values('${word.word}', '${word.mean}', '${word.pronounce}', '${word.userId}', '${word.category}')`;
  }
  mysqlCon.query(query,
    (e1, r1) => {
      if (e1) {
        console.log(e1);
        res.status(400).send({ success: false, msg: 'Wrong Request!!' });
      } else {
        mysqlCon.end();
        res.status(200).send({ success: true, msg: 'save word' });
      }
    });
});

router.put('/update', async (req, res) => {
  const mysqlCon = require('../../../lib/dbConnect')();

  const word = req.body;
  if (!req.headers.authorization) res.status(401).send({ success: false, msg: 'Unauthroized User!' });
  const query = `update word set mean='${word.mean}', pronounce='${word.pronounce}', category='${word.category}' where word='${word.word}'`;
  mysqlCon.query(query,
    (e1, r1) => {
      if (e1) {
        console.log(e1);
        res.status(400).send({ success: false, msg: 'Wrong Request!!' });
      } else {
        mysqlCon.end();
        res.status(200).send({ success: true, msg: 'update word' });
      }
    });
});

router.delete('/delete/:word', async (req, res) => {
  const mysqlCon = require('../../../lib/dbConnect')();

  const { word } = req.params;
  if (!req.headers.authorization) res.status(401).send({ success: false, msg: 'Unauthroized User!' });
  const query = `delete from word where word='${word}'`;
  mysqlCon.query(query,
    (e1, r1) => {
      if (e1) {
        console.log(e1);
        res.status(400).send({ success: false, msg: 'Wrong Request!!' });
      } else {
        mysqlCon.end();
        res.status(200).send({ success: true, msg: 'delete word' });
      }
    });
});

router.all('*', (req, res, next) => {
  next(createError(404, 'Wrong Url!'));
});

module.exports = router;
