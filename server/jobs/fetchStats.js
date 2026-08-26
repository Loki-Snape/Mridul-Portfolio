const pool = require('../config/db');

async function runFetchJob() {
  console.log('Starting stats synchronization job...');
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const githubUser = 'Loki-Snape';
  const leetcodeUser = 'mridul-jha';

  // Get current stored stats as fallback
  let fallback = {
    github_streak: 47,
    github_stars: 26,
    leetcode_solved: 310,
    leetcode_total: 3300,
    leetcode_rank: 82431,
    leetcode_rating: 1650,
    leetcode_streak: 0,
    leetcode_badge: ''
  };

  try {
    const existing = await pool.query('SELECT * FROM stats ORDER BY last_updated DESC LIMIT 1');
    if (existing.rows.length > 0) {
      fallback = { ...fallback, ...existing.rows[0] };
    }
  } catch (err) {
    console.error('Error fetching fallback stats from DB:', err);
  }

  // 1. Fetch GitHub Stars (REST API)
  let stars = fallback.github_stars;
  try {
    const headers = { 'User-Agent': 'Node.js' };
    if (GITHUB_TOKEN) headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    const res = await fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100`, { headers });
    if (res.ok) {
      const repos = await res.json();
      stars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
      console.log(`Successfully fetched GitHub stars: ${stars}`);
    } else {
      console.warn(`GitHub Stars API returned status ${res.status}. Using fallback: ${stars}`);
    }
  } catch (err) {
    console.error('Failed to fetch GitHub stars, using fallback:', err);
  }

  // 2. Fetch GitHub Streak (GraphQL API)
  let streak = fallback.github_streak;
  try {
    if (!GITHUB_TOKEN) {
      console.warn('GITHUB_TOKEN not set. Skipping GitHub streak calculation, using fallback.');
    } else {
      const query = `
        query($login: String!) {
          user(login: $login) {
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;
      const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Node.js',
          'Authorization': `Bearer ${GITHUB_TOKEN}`
        },
        body: JSON.stringify({ query, variables: { login: githubUser } })
      });
      if (res.ok) {
        const payload = await res.json();
        const weeks = payload.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
        const days = weeks.flatMap(w => w.contributionDays).sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Calculate consecutive streak counting backwards from today/yesterday
        const todayStr = new Date().toISOString().split('T')[0];
        const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        
        let activeIndex = days.findIndex(d => d.date === todayStr);
        if (activeIndex === -1 || days[activeIndex].contributionCount === 0) {
          activeIndex = days.findIndex(d => d.date === yesterdayStr);
        }

        if (activeIndex !== -1 && days[activeIndex].contributionCount > 0) {
          let currentStreak = 0;
          for (let i = activeIndex; i >= 0; i--) {
            if (days[i].contributionCount > 0) {
              currentStreak++;
            } else {
              break;
            }
          }
          streak = currentStreak;
          console.log(`Successfully calculated GitHub streak: ${streak}`);
        } else {
          streak = 0;
          console.log('GitHub streak is currently 0 (no contributions today or yesterday).');
        }
      } else {
        console.warn(`GitHub GraphQL API returned status ${res.status}. Using fallback: ${streak}`);
      }
    }
  } catch (err) {
    console.error('Failed to fetch GitHub streak, using fallback:', err);
  }

  // 3. Fetch LeetCode Stats (GraphQL API)
  let lcSolved = fallback.leetcode_solved;
  let lcTotal = fallback.leetcode_total;
  let lcRank = fallback.leetcode_rank;
  let lcRating = fallback.leetcode_rating;
  let lcStreak = fallback.leetcode_streak;
  let lcBadge = fallback.leetcode_badge;

  try {
    const query = `
      query getUserProfile($username: String!) {
        allQuestionsCount {
          difficulty
          count
        }
        matchedUser(username: $username) {
          profile {
            ranking
          }
          userCalendar {
            streak
          }
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
        userContestRanking(username: $username) {
          rating
          badge {
            name
          }
        }
      }
    `;
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Node.js'
      },
      body: JSON.stringify({ query, variables: { username: leetcodeUser } })
    });
    if (res.ok) {
      const payload = await res.json();
      const allQuestions = payload.data?.allQuestionsCount || [];
      const totalQuestionCount = allQuestions.find(q => q.difficulty === 'All')?.count || 3300;

      const matchedUser = payload.data?.matchedUser;
      const solvedCount = matchedUser?.submitStats?.acSubmissionNum?.find(q => q.difficulty === 'All')?.count || fallback.leetcode_solved;
      const ranking = matchedUser?.profile?.ranking || fallback.leetcode_rank;
      const streakCount = matchedUser?.userCalendar?.streak || 0;
      
      const contestRanking = payload.data?.userContestRanking;
      const contestRating = Math.round(contestRanking?.rating || fallback.leetcode_rating);
      const badgeName = contestRanking?.badge?.name || '';

      lcSolved = solvedCount;
      lcTotal = totalQuestionCount;
      lcRank = ranking;
      lcRating = contestRating;
      lcStreak = streakCount;
      lcBadge = badgeName;
      console.log(`Successfully fetched LeetCode stats: solved=${lcSolved}/${lcTotal}, rank=${lcRank}, rating=${lcRating}, streak=${lcStreak}, badge=${lcBadge}`);
    } else {
      console.warn(`LeetCode GraphQL API returned status ${res.status}. Using fallbacks.`);
    }
  } catch (err) {
    console.error('Failed to fetch LeetCode stats, using fallback:', err);
  }

  // Write stats to database
  try {
    await pool.query(
      `INSERT INTO stats (github_streak, github_stars, leetcode_solved, leetcode_total, leetcode_rank, leetcode_rating, leetcode_streak, leetcode_badge, last_updated)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, now())`,
      [streak, stars, lcSolved, lcTotal, lcRank, lcRating, lcStreak, lcBadge]
    );
    console.log('Stats sync completed successfully.');
  } catch (err) {
    console.error('Failed to save stats to database:', err);
  }
}

if (require.main === module) {
  runFetchJob()
    .then(() => {
      console.log('Fetch job script run successful.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Fetch job script error:', err);
      process.exit(1);
    });
}

module.exports = runFetchJob;
