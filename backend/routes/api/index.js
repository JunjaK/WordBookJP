/* eslint-disable no-underscore-dangle */
const createError = require('http-errors');
const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const moment = require('moment');
const secret = require('../../lib/tokenKey');

router.use('/sign', require('./sign'));

const verifyToken = (t) => new Promise((resolve, reject) => {
  jwt.verify(t, secret.jwt.secretKey, (err, v) => {
    if (err) reject(err);
    resolve(v);
  });
});

const signToken = (id, nickname, email) => new Promise((resolve, reject) => {
  const o = {
    issuer: secret.jwt.issuer,
    subject: secret.jwt.subject,
    expiresIn: secret.jwt.expiresIn, // 3분
    algorithm: secret.jwt.algorithm,
  };

  jwt.sign({
    id, nickname, email,
  }, secret.jwt.secretKey, o, (err, token) => {
    if (err) reject(err);
    resolve(token);
  });
});

const getToken = async (t) => {
  let vt = await verifyToken(t);
  const diff = moment(vt.exp * 1000).diff(moment(), 'seconds');
  // return vt
  const expSec = (vt.exp - vt.iat);
  if (diff > expSec / secret.jwt.expiresInDiv) return { user: vt, token: null };

  const nt = await signToken(vt.id, vt.nickname, vt.email, expSec);
  vt = await verifyToken(nt);
  return { user: vt, token: nt };
};

router.all('*', (req, res, next) => {
  // 토큰 검사
  getToken(req.headers.authorization)
    .then((v) => {
      req.user = v.user;
      req.token = v.token;
      next();
    })
    .catch((e) => next(createError(401, e.message)));
});

router.use('/word', require('./word'));
router.use('/category', require('./category'));
router.use('/profile', require('./profile'));
router.use('/test', require('./test'));

router.all('*', (req, res, next) => {
  next(createError(404, 'This page is not exisit'));
});

module.exports = router;
