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
      },
    ];
    for (const p of projects) {
      await pool.query(
        `INSERT INTO projects (title, slug, description, tech_stack, system_load, real_time_sync, tech_complexity, performance_score, stress_test_hp, display_order)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [p.title, p.slug, p.description, p.tech_stack, p.system_load, p.real_time_sync, p.tech_complexity, p.performance_score, p.stress_test_hp, p.display_order]
      );
    }

    // Skills data
    const skills = [
      { name: 'JavaScript', category: 'frontend', proficiency: 90, maze_position: 0, display_order: 0 },
      { name: 'C++', category: 'backend', proficiency: 85, maze_position: 1, display_order: 1 },
      { name: 'Node.js', category: 'backend', proficiency: 95, maze_position: 2, display_order: 2 },
      { name: 'React', category: 'frontend', proficiency: 92, maze_position: 3, display_order: 3 },
      { name: 'Socket.io', category: 'backend', proficiency: 88, maze_position: 4, display_order: 4 },
      { name: 'PostgreSQL', category: 'database', proficiency: 90, maze_position: 5, display_order: 5 },
      { name: 'Express', category: 'backend', proficiency: 89, maze_position: 6, display_order: 6 },
      { name: 'Tailwind CSS', category: 'frontend', proficiency: 80, maze_position: 7, display_order: 7 },
      { name: 'Git', category: 'tools', proficiency: 95, maze_position: 8, display_order: 8 },
    ];
    for (const s of skills) {
      await pool.query(
        `INSERT INTO skills (name, category, proficiency, maze_position, display_order)
         VALUES ($1,$2,$3,$4,$5)`,
        [s.name, s.category, s.proficiency, s.maze_position, s.display_order]
      );
    }

    // Certifications data
    const certs = [
      { title: 'National Writing Marathon', issuer: 'National Writing Marathon', description: '2nd Rank', display_order: 1 },
      { title: 'Golden Pen Award', issuer: 'Golden Pen', description: '10th Rank', display_order: 2 },
    ];
    for (const c of certs) {
      await pool.query(
        `INSERT INTO certifications (title, issuer, description, display_order)
         VALUES ($1,$2,$3,$4)`,
        [c.title, c.issuer, c.description, c.display_order]
      );
    }

    // Experience data
    await pool.query(
      `INSERT INTO experience (role_title, organization, start_date, end_date, description, stat_speed, stat_power, stat_handling, display_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        'President',
        'Software Development Club, VIT Bhopal',
        '2022-01-01',
        null,
        'Led club initiatives and technical events',
        85,
        80,
        90,
        1,
      ]
    );

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
