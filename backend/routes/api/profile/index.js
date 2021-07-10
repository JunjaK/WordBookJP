/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
const express = require('express');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const secret = require('../../../lib/tokenKey');


const router = express.Router();

const verifyToken = (t) => new Promise((resolve, reject) => {
  jwt.verify(t, secret.jwt.secretKey, (err, v) => {
    if (err) reject(err);
    resolve(v);
  });
});

router.get('/myinfo', async (req, res) => {
  const mysqlCon = require('../../../lib/dbConnect')();
  if (!req.headers.authorization) res.status(401).send({ success: false, msg: 'Unauthroized User!' });
  const resolvedToken = await verifyToken(req.headers.authorization);
  mysqlCon.query(`select userId, nickname, email from user where userId = '${resolvedToken.userId}'`, (e1, r1) => {
    if (r1 === undefined) {
      res.status(400).send({ success: false, msg: 'Wrong Request!!' });
    } else {
      res.status(200).send({ success: true, r: { userId: r1[0].userId, nickname: r1[0].nickname, email: r1[0].email } });
      mysqlCon.end();
    }
  });
});

router.all('*', (req, res, next) => {
  next(createError(404, 'Wrong Url!'));
});

module.exports = router;
