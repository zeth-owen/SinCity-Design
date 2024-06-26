// server.js

const express = require('express');
const sequelize = require('./sequelize'); // Import the configured Sequelize instance
const User = require('./models/User'); // Import your Sequelize models
const app = express();
const port = process.env.PORT || 4000;

// Middleware for parsing JSON body
app.use(express.json());

// Define routes or controllers

// Example route: Fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll(); // Fetch all users from the database
    res.json(users); // Send JSON response with fetched users
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Start the server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
