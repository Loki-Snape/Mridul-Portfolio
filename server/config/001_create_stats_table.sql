CREATE TABLE IF NOT EXISTS stats (
    id SERIAL PRIMARY KEY,
    github_streak INTEGER DEFAULT 0,
    github_stars INTEGER DEFAULT 26,
    leetcode_solved INTEGER DEFAULT 0,
    leetcode_total INTEGER DEFAULT 0,
    leetcode_rank INTEGER DEFAULT 0,
    leetcode_rating INTEGER DEFAULT 0,
    leetcode_streak INTEGER DEFAULT 0,
    leetcode_badge TEXT DEFAULT '',
    last_updated TIMESTAMP DEFAULT now()
);
