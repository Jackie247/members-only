const pool = require("../db/pool");

// Games table
async function addUser(username, email, password) {
  const query =
    "INSERT INTO members (password, email, membership, username) VALUES ($1, $2, $3, $4);";
  const values = [password, email, false, username];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addUser,
};
