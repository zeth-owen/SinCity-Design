const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;


app.use(cors());


app.use(express.json());


const userController = require('./controllers/user'); 
app.use('/users', userController);


app.get('/authentication/profile', async (req, res) => {
  // Logic to fetch logged-in user profile
  res.json({ profile: 'user profile data' });
});


app.get('/', (req, res) => {
  res.send('Welcome to SinCity Design');
});


sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
