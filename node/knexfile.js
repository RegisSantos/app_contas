require('dotenv').config();

module.exports = {
  client: 'mysql2',
  connection: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root',
    database: process.env.MYSQL_DATABASE || 'app_contas',
    charset: 'utf8mb4'
  },
  migrations: {
    directory: __dirname + '/migrations'
  },
  seeds: {
    directory: __dirname + '/seeds'
  }
};
