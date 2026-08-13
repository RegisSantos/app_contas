const mysql = require('mysql2/promise');

const host = process.env.MYSQL_HOST || 'mysql-v8';
const port = process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306;
const user = process.env.MYSQL_USER || 'root';
const password = process.env.MYSQL_PASSWORD || 'root';
const database = process.env.MYSQL_DATABASE || 'app_contas';

const maxAttempts = 30;
const delayMs = 2000;

async function wait() {
  let attempt = 0;
  while (attempt < maxAttempts) {
    try {
      const conn = await mysql.createConnection({ host, port, user, password, database });
      await conn.close();
      console.log('Database is available');
      return;
    } catch (err) {
      attempt++;
      console.log(`Waiting for DB (${attempt}/${maxAttempts})...`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  console.error('Database did not become available in time');
  process.exit(1);
}

wait();
