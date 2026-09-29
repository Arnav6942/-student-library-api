const express = require('express');
const db = require('../db');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  const books = db.prepare('SELECT id, title, author, year, copies FROM books ORDER BY title').all();
  res.json(books);
});

router.get('/:id', (req, res) => {
  const book = db.prepare('SELECT id, title, author, year, copies FROM books WHERE id = ?').get(Number(req.params.id));
  if (!book) return res.status(404).json({ error: 'book not found' });
  res.json(book);
});

router.post('/', requireAdmin, (req, res) => {
  const { title, author, year, copies = 1 } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'title and author are required' });
  const info = db
    .prepare('INSERT INTO books (title, author, year, copies) VALUES (?, ?, ?, ?)')
    .run(String(title), String(author), Number(year) || null, Number(copies) || 1);
  res.status(201).json({ id: info.lastInsertRowid });
});

module.exports = router;
