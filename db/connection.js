// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const db = new Pool(dbParams);

db.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err.message);
  } else {
    console.log('Connected to PostgreSQL database:', dbParams.database);
  }
});

module.exports = db;
