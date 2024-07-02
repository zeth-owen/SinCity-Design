const db = require('../config/database');

class User {
  static async create(firstName, lastName, email, role) {
    const query = `
      INSERT INTO users (first_name, last_name, email, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [firstName, lastName, email, role];

    try {
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    const query = `
      SELECT * FROM users
      WHERE id = $1
    `;
    const values = [id];

    try {
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
  
  // Add more static methods for other CRUD operations as needed
  
  static async associateComments(user, comments) {
    // Example of associating comments with a user
    // This needs to be handled manually as per your application's requirements
    // Example SQL query: UPDATE comments SET user_id = $1 WHERE id IN ($2, $3, ...)
    // Execute appropriate queries here
  }
}

module.exports = User;


