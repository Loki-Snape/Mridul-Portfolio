-- PostgreSQL schema for loki-portfolio
-- Table: projects
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    portrait_image TEXT,
    tech_stack TEXT[],
    system_load INTEGER CHECK (system_load >= 0 AND system_load <= 100),
    real_time_sync INTEGER CHECK (real_time_sync >= 0 AND real_time_sync <= 100),
    tech_complexity INTEGER CHECK (tech_complexity >= 0 AND tech_complexity <= 100),
    performance_score INTEGER CHECK (performance_score >= 0 AND performance_score <= 100),
    stress_test_hp INTEGER DEFAULT 100 CHECK (stress_test_hp >= 0),
    live_url TEXT,
    repo_url TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);

-- Table: skills
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100),
    maze_position INTEGER DEFAULT 0,
    display_order INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_skills_display_order ON skills(display_order);

-- Table: certifications
CREATE TABLE IF NOT EXISTS certifications (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    issuer TEXT,
    description TEXT,
    date_earned DATE,
    credential_url TEXT,
    badge_icon TEXT,
    display_order INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_certifications_display_order ON certifications(display_order);

-- Table: experience
CREATE TABLE IF NOT EXISTS experience (
    id SERIAL PRIMARY KEY,
    role_title TEXT NOT NULL,
    organization TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT,
    stat_speed INTEGER CHECK (stat_speed >= 0 AND stat_speed <= 100),
    stat_power INTEGER CHECK (stat_power >= 0 AND stat_power <= 100),
    stat_handling INTEGER CHECK (stat_handling >= 0 AND stat_handling <= 100),
    display_order INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_experience_display_order ON experience(display_order);
