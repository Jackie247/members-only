const pool = require("../db/pool");

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

async function updateMembership(id, status) {
  const query = `UPDATE members SET membership = $2 WHERE id = $1`;
  const values = [id, status];

  try {
    await pool.query(query, values);
  } catch (err) {
    throw err;
  }
}

async function addMessage(title, description, timestamp, memberId, username) {
  const query = `INSERT INTO messages (title, text, timestamp, member_id, username) VALUES ($1,$2, $3, $4, $5);`;
  const values = [title, description, timestamp, memberId, username];

  try {
    await pool.query(query, values);
  } catch (err) {
    throw err;
  }
}

async function getMessages() {
  const query = `SELECT * FROM messages;`;
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  addUser,
  updateMembership,
  addMessage,
  getMessages,
};
