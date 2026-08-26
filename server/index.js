require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/certifications', require('./routes/certifications'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/stats', require('./routes/stats'));

// Daily cron schedule at midnight
const cron = require('node-cron');
const runFetchJob = require('./jobs/fetchStats');
cron.schedule('0 0 * * *', () => {
  console.log('Running daily cron sync for stats...');
  runFetchJob().catch(err => console.error('Cron job error:', err));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
