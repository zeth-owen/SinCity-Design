const router = require('express').Router();
const db = require('../models');
const bcrypt = require('bcrypt');

const { User } = db;

router.post('/', async (req, res) => {
  try {
    let { password, ...rest } = req.body;
    const user = await User.create({
      ...rest,
      role: 'reviewer',
      passwordDigest: await bcrypt.hash(password, 10)
    });
    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
