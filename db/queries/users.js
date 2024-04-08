const db = require('../connection');

const createUser = (username, password) => {
  return db.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password])
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

const getUsers = () => {
  return db.query('SELECT * FROM users')
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    })
};

const getUserIdByUsername = (username) => {
  return db.query('SELECT id FROM users WHERE username = $1', [username])
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}
module.exports = { createUser, getUsers, getUserIdByUsername };
