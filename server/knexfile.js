// Update with your config settings.

module.exports = {
  client: 'mysql',
  connection: {
    user: 'root',
    host: 'localhost',
    port: '3306',
    database: 'hseq_db',
    password: ''
  },
  pool: { min: 2, max: 20 }
};
