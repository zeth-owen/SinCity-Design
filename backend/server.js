require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 4000;

// PostgreSQL connection pool setup
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

// Middleware setup
app.use(express.json());

// Example route using PostgreSQL connection pool
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users'); // Adjust table name as per your schema
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Example additional routes
app.get('/authentication/profile', async (req, res) => {
  res.json({ profile: 'user profile data' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Optional: Verify PostgreSQL connection
(async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL!');
    await client.release(); // Release the client back to the pool
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
  }
})();

