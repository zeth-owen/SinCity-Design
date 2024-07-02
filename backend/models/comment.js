const db = require('./database');

async function createComment(userId, content) {
  const query = 'INSERT INTO comments (user_id, content) VALUES ($1, $2) RETURNING *';
  const values = [userId, content];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createComment,
  // Add more functions as needed
};


