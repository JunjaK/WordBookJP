/* eslint-disable max-len */
/* eslint-disable global-require */
const express = require('express');
const createError = require('http-errors');

const router = express.Router();

// router.get('/dummy', (req, res) => {
//   const mysqlCon = require('../../../lib/dbConnect')();
//   if (!req.headers.authorization) res.status(401).send({ success: false, msg: 'Unauthroized User!' });
//   for (let i = 0; i < 5000; i += 1) {
//     const query = `insert into word (word, mean, pronounce, userid)  values('word${i}', 'mean${i}', 'pronoun${i}', '${1234}')`;
//     mysqlCon.query(query,
//       (e1, r1) => {
//         console.log(r1);
//         console.log(e1);
//       });
//   }
//   mysqlCon.end();
//   res.status(200).send({ success: true, msg: 'Successfully create dummy data' });
// });

router.get('/list', (req, res) => {
  const mysqlCon = require('../../../lib/dbConnect')();
  if (!req.headers.authorization) res.status(401).send({ success: false, msg: 'Unauthroized User!' });
  const {
    search, skip, limit, category, userid,
  } = req.query;
  let queryWord = '';
  let queryCnt = '';
  if (search === '' && category === '') {
    queryCnt = `select count(*) as cnt from word where userid = '${userid}' order by created desc;`;
    queryWord = `select * from word where userid = '${userid}' order by created desc limit ${skip}, ${limit};`;
  } else if (search === '') {
    queryCnt = `select count(*) as cnt from word where word.userid = '${userid}' and category = '${category}'  order by created desc;`;
    queryWord = `select * from word where userid = '${userid}' and category = '${category}' order by created desc limit ${skip}, ${limit};`;
  } else if (category === '') {
    queryCnt = `select count(*) as cnt from word where word.userid = '${userid}' and (mean like '%${search}%' or pronounce like '%${search}%') order by created desc;`;
    queryWord = `select * from word where userid = '${userid}' and (mean like '%${search}%' or pronounce like '%${search}%') order by created desc limit ${skip}, ${limit};`;
  } else {
    queryCnt = `select count(*) as cnt from word where word.userid = '${userid}' and category = '${category}' and (mean like '%${search}%' or pronounce like '%${search}%') order by created desc;`;
    queryWord = `select * from word where userid = '${userid}' and category = '${category}' and (mean like '%${search}%' or pronounce like '%${search}%') order by created desc limit ${skip}, ${limit};`;
  }
  mysqlCon.query(queryCnt, (e1, r1) => {
    console.log(e1);
    console.log(r1);
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
      console.log(r1);
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
