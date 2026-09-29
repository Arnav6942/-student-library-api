const express = require('express');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

const app = express();
app.use(express.json({ limit: '100kb' }));

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'internal error' });
});

module.exports = app;
