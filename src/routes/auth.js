const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (typeof email !== 'string' || typeof password !== 'string' || password.length < 10) {
    return res.status(400).json({ error: 'email and a password of at least 10 characters are required' });
  }
  const hash = await bcrypt.hash(password, 12);
  try {
    db.prepare('INSERT INTO members (email, password_hash) VALUES (?, ?)').run(email, hash);
  } catch {
    return res.status(409).json({ error: 'account already exists' });
  }
  res.status(201).json({ ok: true });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const member = db.prepare('SELECT id, password_hash, role FROM members WHERE email = ?').get(String(email));
  if (!member || !(await bcrypt.compare(String(password), member.password_hash))) {
    return res.status(401).json({ error: 'wrong email or password' });
  }
  const token = jwt.sign({ id: member.id, role: member.role }, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '2h',
  });
  res.json({ token });
});

module.exports = router;
