require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Import cors middleware
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 4000;

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

console.log('Database configuration:', {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database');
  release(); // Release the client back to the pool
});

app.use(cors());
app.use(express.json());

// Routes

// Get all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Create a new userapp.post('/users', async (req, res) => {
  app.post('/users', async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      const passwordDigest = await bcrypt.hash(password, 10); // Ensure this is inside an async function
  
      const client = await pool.connect();
      try {
        const result = await client.query(
          'INSERT INTO users (first_name, last_name, email, password_digest) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email, created_at, updated_at',
          [first_name, last_name, email, passwordDigest]
        );
        const newUser = result.rows[0];
        res.json(newUser);
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  });
  


app.get('/auth/profile', async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user is correctly set by authentication middleware

    const query = 'SELECT id, first_name, last_name, email FROM users WHERE id = $1';
    const result = await pool.query(query, [userId]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Log the user profile data for debugging
    console.log('User Profile:', user);

    // Return the user profile data
    res.json({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'An error occurred fetching user profile' });
  }
});




// User authentication and profile routes
const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'Could not find a user with the provided email' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_digest);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({ user, token });
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ message: 'An error occurred during authentication' });
  }
});

authRouter.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [decoded.id]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'An error occurred fetching user profile' });
  }
});

app.use('/auth', authRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

