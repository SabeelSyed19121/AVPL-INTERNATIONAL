// backend/controllers/authController.js
const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'username and password required' });

  try {
    const hashed = await bcrypt.hash(password, 10);
    const stmt = `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`;
    db.run(stmt, [username, hashed, role || 'user'], function (err) {
      if (err) {
        if (err.message.includes('UNIQUE')) return res.status(400).json({ message: 'Username already exists' });
        return res.status(500).json({ message: err.message });
      }
      const id = this.lastID;
      const token = jwt.sign({ id, role: role || 'user', username }, process.env.JWT_SECRET);
      res.json({ token, user: { id, username, role: role || 'user' } });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'username and password required' });

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role, username: user.username }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  });
};

module.exports = { register, login };
