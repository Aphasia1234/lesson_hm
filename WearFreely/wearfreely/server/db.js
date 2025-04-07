// db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Ray20040131.',
  database: 'personpage'
});

module.exports = pool.promise();
