const express = require('express');
const router = express.Router();

// Sample route
router.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from TaoTaoTuan API!' });
});

module.exports = router;
