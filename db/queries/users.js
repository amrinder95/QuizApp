// db/queries/users.js
const db = require("../connection");
const bcrypt = require("bcrypt");

const createUser = async (username, password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql =
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";
    const values = [username, hashedPassword];

    const data = await db.query(sql, values);
    console.log("User inserted:", data.rows[0]);
    return data.rows;
  } catch (err) {
    console.error("Error inserting user:", err.message);
    throw err;
  }
};

const getUsers = () => {
  return db
    .query("SELECT * FROM users")
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getUserIdByUsername = (username) => {
  return db
    .query("SELECT id, username, password FROM users WHERE username = $1", [
      username,
    ])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};
module.exports = { createUser, getUsers, getUserIdByUsername };
