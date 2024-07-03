require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
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

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
}

// User authentication and profile routes
const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password_digest);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ user, token });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Failed to login' });
  }
});





authRouter.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const client = await pool.connect();
    try {
      const result = await client.query('SELECT id, email, first_name, last_name FROM users WHERE id = $1', [decodedToken.userId]);
      const user = result.rows[0];

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

authRouter.post('/signup', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO users (first_name, last_name, email, password_digest) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email',
        [first_name, last_name, email, hashedPassword]
      );
      const newUser = result.rows[0];

      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ user: newUser, token });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Failed to signup' });
  }
});


app.use('/auth', authRouter);


app.post('/templates/:id/comments', authenticateToken, async (req, res) => {
  const templateId = req.params.id;
  const { comment, rating } = req.body;

  try {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO comments (comment, rating, user_id, template_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [comment, rating, req.user.userId, templateId]
      );
      const newComment = result.rows[0];
      res.json(newComment);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
});
app.get('/comments', async (req, res) => {
  const templateId = req.query.templateId; // Fetch templateId from query params

  if (!templateId) {
    return res.status(400).json({ error: 'templateId is required' });
  }

  try {
    // Query your database to fetch comments for the specified templateId
    const result = await pool.query('SELECT * FROM comments WHERE template_id = $1', [templateId]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});





app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

