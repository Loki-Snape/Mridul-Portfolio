// server/config/seed.js
const pool = require('./db');

async function seed() {
  try {
    // Truncate tables in order to respect possible foreign keys
    await pool.query('TRUNCATE TABLE experience RESTART IDENTITY CASCADE');
    await pool.query('TRUNCATE TABLE certifications RESTART IDENTITY CASCADE');
    await pool.query('TRUNCATE TABLE skills RESTART IDENTITY CASCADE');
    await pool.query('TRUNCATE TABLE projects RESTART IDENTITY CASCADE');

    // Projects data
    const projects = [
      {
        title: 'Ironclad Command',
        slug: 'ironclad-command',
        description: '3v3 Tactical Mech Battler with Socket.io real-time sync and ELO ranking',
        tech_stack: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
        system_load: 78,
        real_time_sync: 92,
        tech_complexity: 85,
        performance_score: 80,
        stress_test_hp: 100,
        display_order: 1,
        repo_url: 'https://github.com/Loki-Snape/ironclad-command',
        live_url: 'https://ironclad-command.vercel.app/',
        portrait_image: '/assets/images/projects/ironclad-board.png',
      },
      {
        title: 'Shadow Syndicate',
        slug: 'shadow-syndicate',
        description: 'Cyberpunk strategy game with cron workers and row-level database locking',
        tech_stack: ['Node.js', 'PostgreSQL', 'Cron'],
        system_load: 70,
        real_time_sync: 60,
        tech_complexity: 88,
        performance_score: 75,
        stress_test_hp: 100,
        display_order: 2,
        repo_url: 'https://github.com/Loki- Snape/shadow-syndicate',
        live_url: 'https://shadow-syndicate.onrender.com/',
        portrait_image: '/assets/images/projects/syndicate-city.png',
      },
      {
        title: "Jai's Arcade",
        slug: 'jais-arcade',
        description: 'Retro platformer powered by a vanilla JS canvas engine',
        tech_stack: ['JavaScript', 'Canvas API'],
        system_load: 45,
        real_time_sync: 30,
        tech_complexity: 60,
        performance_score: 90,
        stress_test_hp: 100,
        display_order: 3,
        repo_url: 'https://github.com/Loki-Snape/Jai-s-Arcade',
        portrait_image: '/assets/images/projects/jais-arcade-logo.png',
      },
      {
        title: 'Kinetic',
        slug: 'kinetic-kanban',
        description: 'Real-time PERN Kanban board with Socket.io sync',
        tech_stack: ['PostgreSQL', 'Express', 'React', 'Node.js', 'Socket.io'],
        system_load: 65,
        real_time_sync: 88,
        tech_complexity: 70,
        performance_score: 82,
        stress_test_hp: 100,
        display_order: 4,
        repo_url: 'https://github.com/Loki-Snape/Kinetic',
        live_url: null,
        portrait_image: '/assets/images/projects/kinetic-kanban.png',
      },
    ];
    for (const p of projects) {
      await pool.query(
        `INSERT INTO projects (title, slug, description, tech_stack, system_load, real_time_sync, tech_complexity, performance_score, stress_test_hp, display_order, repo_url, live_url, portrait_image)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
        [p.title, p.slug, p.description, p.tech_stack, p.system_load, p.real_time_sync, p.tech_complexity, p.performance_score, p.stress_test_hp, p.display_order, p.repo_url, p.live_url, p.portrait_image]
      );
    }

    // Skills data
    const skills = [
      { name: 'PostgreSQL', category: 'database' },
      { name: 'Express.js', category: 'backend' },
      { name: 'React.js', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'JavaScript (ES6+)', category: 'frontend' },
      { name: 'C++', category: 'other' },
      { name: 'HTML5', category: 'frontend' },
      { name: 'CSS3', category: 'frontend' },
      { name: 'Python', category: 'other' },
      { name: 'Tailwind CSS', category: 'frontend' },
      { name: 'HTML5 Canvas', category: 'frontend' },
      { name: 'EJS', category: 'frontend' },
      { name: 'Bootstrap', category: 'frontend' },
      { name: 'Socket.io / WebSockets', category: 'backend' },
      { name: 'REST APIs', category: 'backend' },
      { name: 'Node-Cron', category: 'backend' },
      { name: 'SQL', category: 'database' },
      { name: 'AWS', category: 'other' },
      { name: 'Git', category: 'other' },
      { name: 'Creative Writing', category: 'other' },
    ].map((s, idx) => ({ ...s, proficiency: 85, maze_position: idx, display_order: idx }));

    for (const s of skills) {
      await pool.query(
        `INSERT INTO skills (name, category, proficiency, maze_position, display_order)
         VALUES ($1,$2,$3,$4,$5)`,
        [s.name, s.category, s.proficiency, s.maze_position, s.display_order]
      );
    }

    // Certifications data
    const certs = [
      { title: 'Introduction to Machine Learning', issuer: 'NPTEL', description: 'Completed May 2025', display_order: 1 },
      { title: 'Marketing Analytics', issuer: 'NPTEL', description: 'Completed May 2026', display_order: 2 },
      { title: 'The Bits and Bytes of Computer Networking', issuer: 'Google', description: 'Completed Aug 2025', display_order: 3 },
      { title: 'Career Essentials in Software Development', issuer: 'Microsoft & LinkedIn', description: 'Completed May 2025', display_order: 4 },
      { title: 'Responsive Web Design', issuer: 'freeCodeCamp', description: 'Completed Feb 2026', display_order: 5 },
      { title: 'JavaScript', issuer: 'freeCodeCamp', description: 'Completed Jun 2026', display_order: 6 },
      { title: 'Golden Pen Award', issuer: 'Pratilipi', description: '10th Rank — storytelling and creative writing excellence among thousands of participants', display_order: 7 },
      { title: 'National Writing Marathon - 4', issuer: 'Pratilipi', description: '2nd Rank — narrative skills and literary creativity, nationwide competition', display_order: 8 }
    ];
    for (const c of certs) {
      await pool.query(
        `INSERT INTO certifications (title, issuer, description, display_order)
         VALUES ($1,$2,$3,$4)`,
        [c.title, c.issuer, c.description, c.display_order]
      );
    }

    // Experience data
    const experience = [
      {
        role_title: 'Data Analyst Associate Intern',
        organization: 'Excelerate',
        start_date: '2025-07-01',
        end_date: '2025-08-31',
        description: 'Analyzed large datasets for trends and actionable insights, translating findings into structured stakeholder reports.',
        stat_speed: 75,
        stat_power: 70,
        stat_handling: 80,
        display_order: 1
      },
      {
        role_title: 'President, Secretary General & PR/Outreach Lead',
        organization: 'Software Development Club, VIT Bhopal',
        start_date: '2024-12-01',
        end_date: '2026-05-10',
        description: 'Led technical initiatives and coding bootcamps while managing club operations, cross-department coordination, and external outreach.',
        stat_speed: 85,
        stat_power: 80,
        stat_handling: 90,
        display_order: 2
      }
    ];
    for (const e of experience) {
      await pool.query(
        `INSERT INTO experience (role_title, organization, start_date, end_date, description, stat_speed, stat_power, stat_handling, display_order)`
        + ` VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [e.role_title, e.organization, e.start_date, e.end_date, e.description, e.stat_speed, e.stat_power, e.stat_handling, e.display_order]
      );
    }

    console.log('Seed complete');
  } catch (err) {
    console.error('Seed error:', err);
    throw err;
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  seed();
}
