/* eslint-disable max-len */
/* eslint-disable global-require */
const express = require('express');
const createError = require('http-errors');

const router = express.Router();

router.get('/list/:userid', (req, res) => {
  const { userid } = req.params;
  const mysqlCon = require('../../../lib/dbConnect')();
  if (!req.headers.authorization) res.status(401).send({ success: false, msg: 'Unauthroized User!' });
  mysqlCon.query(`select * from categories where userid='${userid}'`, (e1, r1) => {
    if (e1) {
      console.log(e1);
      res.status(400).send({ success: false, msg: 'Wrong Request!!' });
    } else {
      mysqlCon.end();
      res.status(200).send({ success: true, r: r1 });
    }
  });
});

router.post('/add/:userid', async (req, res) => {
  const mysqlCon = require('../../../lib/dbConnect')();
  const { userid } = req.params;
  if (!req.headers.authorization) res.status(401).send({ success: false, msg: 'Unauthroized User!' });
  mysqlCon.query(`insert into categories (category, userid) values('${req.body.category}', '${userid}');`,
    (e1, r1) => {
      if (e1) {
        console.log(e1);
        res.status(400).send({ success: false, msg: 'Wrong Request!!' });
      } else {
        mysqlCon.end();
        res.status(200).send({ success: true, msg: 'Add Category' });
      }
    });
});

router.put('/update', async (req, res) => {
  const mysqlCon = require('../../../lib/dbConnect')();
  if (!req.headers.authorization) res.status(401).send({ success: false, msg: 'Unauthroized User!' });
  mysqlCon.query(`update categories set category='${req.body.category}' where category='${req.body.oldCategory}';`,
    (e1, r1) => {
      if (e1) {
        console.log(e1);
        res.status(400).send({ success: false, msg: 'Wrong Request!!' });
      } else {
        mysqlCon.end();
        res.status(200).send({ success: true, msg: 'Update Category' });
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
