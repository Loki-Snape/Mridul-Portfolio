const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM stats ORDER BY last_updated DESC LIMIT 1');
    if (result.rows.length === 0) {
      return res.json({
        github_streak: 47,
        github_stars: 26,
        leetcode_solved: 310,
        leetcode_total: 3300,
        leetcode_rank: 82431,
        leetcode_rating: 1650,
        leetcode_streak: 0,
        leetcode_badge: ''
      });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
