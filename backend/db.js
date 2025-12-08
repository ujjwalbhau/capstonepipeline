// simple mysql connection helper using mysql2/promise
const mysql = require('mysql2/promise');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

async function getPool() {
  if (!global.__pool) {
    global.__pool = await mysql.createPool({
      host: DB_HOST || 'mysql',
      user: DB_USER || 'root',
      password: DB_PASSWORD || 'password',
      database: DB_NAME || 'demo',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return global.__pool;
}

module.exports = { getPool };
