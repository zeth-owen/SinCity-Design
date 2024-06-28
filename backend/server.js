const express = require('express');
const cors = require('cors');
const sequelize = require('./sequelize');
const User = require('./models/User');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 4000;

// Enable CORS middleware
app.use(cors());

// Middleware for parsing JSON body
app.use(express.json());

// Example route: Fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Example route: Create a new user
app.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // Assuming Sequelize model User has attributes firstName, lastName, email, password
    const newUser = await User.create({ firstName, lastName, email, password });
    res.status(201).json(newUser); // HTTP status 201 indicates creation success
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Example route: Fetch logged-in user profile
app.get('/authentication/profile', async (req, res) => {
  // Logic to fetch logged-in user profile
  res.json({ profile: 'user profile data' });
});

// Start the server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

