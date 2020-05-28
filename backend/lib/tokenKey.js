module.exports = {
  jwt: {
    secretKey: 'fjieowjgoihoi14j12409e9porj435',
    issuer: 'wordbook',
    subject: 'wordbook_token',
    algorithm: 'HS256',
    expiresIn: 60 * 60 * 24, // 1일
    expiresInDiv: 3, // 토큰시간 나누는 기준
  },
};
