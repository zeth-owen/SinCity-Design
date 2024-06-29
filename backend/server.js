const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Enable CORS middleware
app.use(cors());

// Middleware for parsing JSON body
app.use(express.json());

// Import and use user controller
const userController = require('./controllers/user'); // Updated import
app.use('/users', userController);

// Example route: Fetch logged-in user profile
app.get('/authentication/profile', async (req, res) => {
  // Logic to fetch logged-in user profile
  res.json({ profile: 'user profile data' });
});

// Route for root URL: Welcome message
app.get('/', (req, res) => {
  res.send('Welcome to SinCity Design');
});

// Start the server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
