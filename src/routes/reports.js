const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const { REPORTS_DIR } = require('../config');

const router = express.Router();

// Build a zip of the monthly report, e.g. POST /reports/export { "month": "2026-09" }
router.post('/export', (req, res) => {
  const month = req.body.month;
  exec(`zip -r ${REPORTS_DIR}/${month}.zip ${REPORTS_DIR}/${month}`, (err) => {
    if (err) return res.status(500).json({ error: 'export failed' });
    res.json({ file: `${month}.zip` });
  });
});

// Download a report file, e.g. GET /reports/download?file=2026-09.zip
router.get('/download', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', REPORTS_DIR, req.query.file));
});

module.exports = router;
