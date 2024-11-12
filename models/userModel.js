const pool = require("../config/database");

async function getUser(username) {
  try {
    const query = `SELECT username FROM users WHERE username = $1`;
    const response = await pool.query(query, [username]);

    if (response.rows.length === 0) {
      return null;
    }
    return response.rows[0];
  } catch (error) {
    console.log(`Error retrieving user ${username}`, error.message);
    throw new Error("Internal Server Error");
  }
}
async function getUserById(id) {
  try {
    const query = `SELECT * FROM users WHERE user_id = $1`;
    const response = await pool.query(query, [id]);

    return response.rows[0];
  } catch (error) {
    throw error;
  }
}

async function createUser(info) {
  try {
    const { first_name, last_name, username, password_hash } = info;
    const existingUser = await getUser(username);

    if (existingUser) {
      throw new Error(`username ${username} already taken`);
    }
    const query = `INSERT INTO users (first_name, last_name, username, password_hash) VALUES ($1, $2, $3, $4) RETURNING * `;
    const response = await pool.query(query, [
      first_name,
      last_name,
      username,
      password_hash,
    ]);

    return response.rows[0];
  } catch (error) {
    console.log("Error inserting user: ", error.message);
    throw new Error(
      `Failed to create user. Please try again. Error: ${error.message}`,
    );
  }
}

module.exports = { getUser, getUserById, createUser };
