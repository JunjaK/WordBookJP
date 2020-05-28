/* eslint-disable no-console */
const mysql = require('mysql');
const dbInfo = require('./dbInfo');

module.exports = () => {
  const con = mysql.createConnection(
    {
      host: dbInfo.host,
      port: dbInfo.port,
      user: dbInfo.user,
      password: dbInfo.password,
      database: dbInfo.database,
    },
  );
  con.connect(
    (err) => {
      if (err) console.error(`mysql connection error: ${err}`);
      else console.info('mysql is connected successfully.');
    },
  );

  return con;
};
