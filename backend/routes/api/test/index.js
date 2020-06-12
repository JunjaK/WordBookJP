/* eslint-disable max-len */
/* eslint-disable global-require */
const express = require('express');
const createError = require('http-errors');

const router = express.Router();

// 테스트 설정에 맞는 단어들을 반환해줌.
router.post('/take', async (req, res) => {
  const mysqlCon = require('../../../lib/dbConnect')();
  const setting = req.body;
  let query = null;
  if (!req.headers.authorization) res.status(401).send({ success: false, msg: 'Unauthroized User!' });

  if (setting.area === 'All words') { // 전체 단어 대상의 경우, 전체 단어 중 랜덤 20개 선택
    query = `select * from word where userid='${setting.userid}' order by rand() limit 20;`;
  } else if (setting.area === 'Wrong words') { // Wrong words의 경우, 틀린 단어 중 랜덤 20개, 최근 20개 선택
    if (setting.type === 'total') {
      query = `select * from word where userid='${setting.userid}' and wrong='${1}' order by rand() limit 20;`;
    } else {
      query = `select * from word where userid='${setting.userid}' and wrong='${1}' order by created desc limit 0,20;`;
    }
  } else if (setting.type === 'total') { // 카테고리의  경우,  단어 중 랜덤 20개, 최근 20개 선택
    query = `select * from word where userid='${setting.userid}' and category='${setting.area}' order by rand() limit 20;`;
  } else {
    query = `select * from word where userid='${setting.userid}' and category='${setting.area}' order by created desc limit 0,20;`;
  }
  console.log(query);
  mysqlCon.query(query, (e1, r1) => {
    if (e1) {
      console.log(e1);
      res.status(400).send({ success: false, msg: 'Wrong Request!!' });
    } else {
      mysqlCon.end();
      res.status(200).send({ success: true, r: r1 });
    }
  });
});

// 테스트 결과 저장, 오답의 경우 word.wrong = true 실행. -> 반복문 query
router.post('/submit', async (req, res) => {
  const mysqlCon = require('../../../lib/dbConnect')();
  const result = req.body;
  if (!req.headers.authorization) res.status(401).send({ success: false, msg: 'Unauthroized User!' });
  mysqlCon.query(`insert into testresults (userid, correct, wrong) values('${result.userid}', '${result.correct}', '${result.wrong}');`,
    async (e1, r1) => {
      console.log(r1);
      if (e1) {
        console.log(e1);
        res.status(400).send({ success: false, msg: 'Wrong Request!!' });
      } else {
        await result.answers.forEach(async (element, index) => {
          let query = null;
          if (element.correct) {
            query = `update word set wrong='${0}', testnum='${r1.insertId}' where word='${element.word.word}';`;
          } else {
            query = `update word set wrong='${1}', testnum='${r1.insertId}' where word='${element.word.word}';`;
          }
          mysqlCon.query(query, (e, r) => {
            if (e) {
              console.log(e);
              res.status(400).send({ success: false, msg: 'Wrong Request!!' });
            }
          });
        });
        await mysqlCon.end();
        res.status(200).send({ success: true, msg: 'Update TestResult' });
      }
    });
});


router.delete('/delete/:category', async (req, res) => {
  const mysqlCon = require('../../../lib/dbConnect')();
  if (!req.headers.authorization) res.status(401).send({ success: false, msg: 'Unauthroized User!' });
  const { category } = req.params;
  mysqlCon.query(`delete from categories where category='${category}';`,
    (e1, r1) => {
      if (e1) {
        console.log(e1);
        res.status(400).send({ success: false, msg: 'Wrong Request!!' });
      } else {
        mysqlCon.end();
        res.status(200).send({ success: true, msg: 'Delete Category' });
      }
    });
});


router.all('*', (req, res, next) => {
  next(createError(404, 'Wrong Url!'));
});

module.exports = router;
