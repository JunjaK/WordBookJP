/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
const express = require('express');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secret = require('../../../lib/tokenKey');

const router = express.Router();

const signToken = (id, nickname, email) => new Promise((resolve, reject) => {
  const o = {
    issuer: secret.jwt.issuer,
    subject: secret.jwt.subject,
    expiresIn: secret.jwt.expiresIn, // 10분
    algorithm: secret.jwt.algorithm,
  };
  jwt.sign({
    id, nickname, email,
  }, secret.jwt.secretKey, o, (err, token) => {
    if (err) reject(err);
    resolve(token);
  });
});

router.post('/up', async (req, res) => {
  const mysqlCon = require('../../../lib/dbConnect')();

  const password = crypto.scryptSync(req.body.password, req.body.id.toString(), 64, { N: 1024 }).toString('hex');
  await mysqlCon.query(`select userId from user where userId = '${req.body.id}'`, (e1, r1) => {
    if (r1.length > 0) {
      res.status(406).send({ success: false, msg: 'Duplicated ID!!' });
    } else {
      mysqlCon.query(`select nickname from user where nickname = '${req.body.nickname}'`, (e2, r2) => {
        if (r2.length > 0) {
          res.status(406).send({ success: false, msg: 'Duplicated Nickname!!' });
        } else {
          mysqlCon.query(`select email from user where email = '${req.body.email}'`, (e3, r3) => {
            if (r3.length > 0) {
              res.status(406).send({ success: false, msg: 'Duplicated Email!!' });
            } else {
              mysqlCon.query(`insert into user (userId, password, email, nickname) values('${req.body.id}', '${password}', '${req.body.email}', '${req.body.nickname}')`, (upErr, UpRes) => {
                if (upErr) {
                  res.status(400).send(upErr);
                } else {
                  mysqlCon.end();
                  res.send({ success: true, msg: 'Successfully created account' });
                }
              });
            }
          });
        }
      });
    }
  });
});

router.post('/in', (req, res) => {
  const mysqlCon = require('../../../lib/dbConnect')();

  const password = crypto.scryptSync(req.body.password, req.body.id.toString(), 64, { N: 1024 }).toString('hex');
  mysqlCon.query(`select userId, nickname, email, password from user where userId = '${req.body.id}' and password = '${password}'`, async (e1, r1) => {
    if (r1.length === 0) {
      res.status(406).send({ success: false, msg: 'Wrong ID or Password!!' });
    } else {
      const token = await signToken(r1[0].userId, r1[0].nickname, r1[0].email);
      mysqlCon.end();
      res.status(200).send({
        success: true, token, nickname: r1[0].nickname, userId: r1[0].userId,
      });
    }
  });
});

router.all('*', (req, res, next) => {
  next(createError(404, 'Wrong Url!'));
});

module.exports = router;
