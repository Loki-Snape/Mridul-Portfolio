# Mridul Jha — SEGA Hyper-Arcade Portfolio

A 1990s SEGA arcade / House of the Dead themed developer portfolio. Every section is built as a tribute to a specific classic game — Bloody Roar 2, Galaxian, Pac-Man, Super Mario, Tetris, Road Rash, Need for Speed: Most Wanted, Donkey Kong, Minecraft, Plants vs Zombies, and Mortal Kombat all make an appearance, alongside a full Konami Code easter-egg terminal.

Live site: https://mridul-portfolio-red.vercel.app Backend API: https://mridul-portfolio-ioq9.onrender.com Repo: github.com/Loki-Snape/Mridul-Portfolio

## Tech Stack
- **Frontend**: Vite + React (JavaScript, no TypeScript), Tailwind CSS v3.4.17
- **Backend**: Express + PostgreSQL (PERN stack)
- **Database**: Neon (serverless Postgres)
- **Animation**: CSS 3D transforms and keyframes (primary), GSAP/Lenis, Framer Motion
- **3D**: React Three Fiber / Three.js was evaluated early on but mostly abandoned in favor of CSS 3D after tuning difficulties — may revisit later for certification cards/skill dots as a separate phase
- **Scheduling**: node-cron for daily background jobs
- **Hosting**: Vercel (frontend), Render (backend), Neon (database), cron-job.org (daily external trigger)

## Color palette
- **Sonic Blue**: `#0055FF`
- **Arcade Red**: `#FF0033`
- **Sega Gold**: `#FFD700`
- **CRT Black**: `#080810`

## Fonts
Press Start 2P, VT323, Rajdhani/Chakra Petch, JetBrains Mono, plus Caveat/Kalam/Permanent Marker for the handwritten Leaderboard board.

## Features by Section

### Projects — ProjectCard.jsx
SOR2 (Streets of Rage 2) styled cards in an auto-drifting marquee/carousel that pauses on hover. Real screenshots and live links to each project.
Featured projects:
- **Ironclad Command** — 3v3 tactical mech battler, Socket.io real-time sync + ELO ranking (live: ironclad-command.vercel.app)
- **Shadow Syndicate** — cyberpunk strategy game, cron workers + row-level DB locking (live: shadow-syndicate.onrender.com)
- **Jai's Arcade** — retro platformer, vanilla JS canvas engine
- **Kinetic Kanban** — real-time PERN Kanban board with Socket.io sync

### Skills — SkillsMaze.jsx
Pac-Man themed. The four ghosts (Blinky, Pinky, Inky, Clyde) chase and "eat" skill pellets arranged in a 5-column grid, moving row-by-row left-to-right with a teleport-to-next-row pattern (not a snake pattern).

### Certifications & Awards — CertificationBlocks.jsx
Super Mario themed. An auto-sequence jumps to hit question-block sprites; each hit reveals a certification card for ~6 seconds before looping to the next, carousel-style.

### About — TetrisAboutReveal.jsx
A pre-filled Tetris grid with two intentional gaps. An O-square piece and an I-line piece fall into place to complete the board, then the whole grid "poofs" away to reveal the About bio text underneath.

### Experience — ExperienceRoadRash.jsx
Road Rash themed. CSS 3D (not R3F) cards fly toward the viewer past a large speedometer graphic, growing larger as they approach, bottom-aligned, looping through all 5 experience entries.
Experience entries: Excelerate Data Analyst Intern (Jul–Aug 2025) · SDC VIT Bhopal President/Secretary General/PR Lead (Dec 2024–May 2026) · Writer at Pratilipi (ongoing — Golden Pen Award Aug 2023, National Writing Marathon-4 2nd rank Jul 2026)

### Education — EducationBeastMorph.jsx
Bloody Roar 2 "Character Select" screen homage. School name rendered in a bold gold outlined "Bakuryu" style; tier label ("MATRICULATION" / "INTERMEDIATE" / "GRADUATION") rendered in the pink-outlined "CHARACTER SELECT" style; a 10-second auto-cycle countdown between entries, overridable by clicking the square tier buttons directly; beast character art (fox/wolf/lion) morphs per entry.
Real academic record: 10th — 92%, DAV Public School, Begusarai (2019–2021) · 12th — 76.4%, Mahatma Gandhi Sikshan Sansthan, Darbhanga (2021–2023, Science/PCM) · B.Tech CSE — GPA 8.96, VIT Bhopal (2023–2027)

### Leaderboard — LeaderboardSection.jsx
Need for Speed: Most Wanted "Blacklist" themed. A grungy handwritten-style board with entries crossed out by an animated red marker-stroke (all except the current #1, which shows a blinking terminal cursor instead). This section pulls live, self-updating data — see the Dynamic Stats System section below.
6 tracked stats, in order:
1. GitHub Streak (live)
2. LeetCode Streak (live)
3. LeetCode Rank (live)
4. Total Project Stars (live)
5. LeetCode Rating, with contest badge e.g. "Knight" (live)
6. LeetCode Problems Solved (live)

### Socials — GalaxianSocials.jsx
Galaxian themed. Enemy "ships" for each platform (GitHub, LinkedIn, Codolio, LeetCode, X, Mail) plus a player ship all drift left-right-left continuously across the section. Each enemy ship is a direct clickable link to the real profile — deliberately simplified from an earlier laser-shooting mechanic that was scrapped in favor of just working reliably.

### Contact Me — ContactCoinSlot.jsx
An arcade cabinet "Insert Coin" interaction. A single 3D-spinning coin sits above a coin slot; clicking it plays an insert animation and the coin fully disappears, unlocking the contact form nested inside the cabinet's screen cutout. Submitting the form triggers a Mortal Kombat "FINISH HIM!!" CSS-burst overlay before the message actually sends.

## Dynamic Stats System
The Leaderboard doesn't use hardcoded numbers — it pulls real, live data on a daily schedule.

Pipeline:
1. `server/jobs/fetchStats.js` queries the GitHub GraphQL API (contribution calendar → streak calculation, repo stars summed across all repos) using a GitHub Personal Access Token, and the LeetCode public GraphQL endpoint (no auth required) for solved count, rank, contest rating, contest badge, and submission streak.
2. Results are written to a stats table in the Neon Postgres database.
3. `GET /api/stats` serves the latest row to the frontend.
4. `LeaderboardSection.jsx` fetches from that endpoint on mount, with the original hardcoded values kept as a fallback if the fetch ever fails.

Keeping it updated in production: node-cron only runs while the Node process stays alive, and Render's free tier sleeps after ~15 minutes of inactivity — so relying on node-cron alone would mean the daily update silently never fires. The fix: a protected `GET /api/fetch-stats?key=...` endpoint was added, and an external free scheduler (cron-job.org) hits it once daily at midnight UTC. This both wakes the sleeping Render service and triggers the fetch in one request. node-cron is still kept in the code as a backup trigger path.

Codolio was dropped as a live-tracked source — it has no public API, and scraping its profile page was judged too fragile to rely on. That slot was replaced with a LeetCode-based stat instead (LeetCode Rating).

## Easter Eggs
Built across four rounds, plus the Konami Code terminal that predates all of them:
- **Global (not inside the terminal)**:
  - **Minesweeper Bait-and-Blast**: a small, deliberately tempting glowing "bonus orb" is hidden somewhere on the normal page. Clicking it swaps to a Minesweeper bomb, then the entire page slowly fades/dissolves to black — no jarring instant blank, no hint text. Typing `HESOYAM` (the classic GTA cheat) anywhere reverses the fade and restores the page.
- **Inside the Konami Code terminal**:
  - **SEGA** — plays the SEGA startup chime and briefly flashes a centered "MRIDUL JHA" logo, then disappears.
  - **PONG** — launches a small playable Pong game inside the terminal (player controls the left paddle with arrow keys, a basic imperfect CPU controls the right paddle). Winning shows a brief "YOU WIN" message and returns to the idle terminal. Losing triggers a Minecraft creeper — the creeper face scales up rapidly with a screen shake, then the entire terminal "blasts" closed, dropping the user back to the normal portfolio. The terminal fully resets its internal state on close, so reopening it always starts fresh.
- **Ambient (no code required)**:
  - **Donkey Kong** appears unprompted on a randomized interval, slides in from a screen corner, throws several large barrels that fall straight downward (classic-arcade style, not an arc), then disappears — repeating roughly every 20 seconds while the on-screen appearance itself lasts about 4.5 seconds.
- **Page load**:
  - **Plants vs Zombies intro**: on initial page load, a peashooter fires a pea (aligned to its actual shooting height) across the screen at a zombie; on impact the zombie reacts, and the loading overlay fades away to reveal the real site underneath — which is already fully mounted behind the overlay, so there's no additional blank gap. The Tetris About-section animation is explicitly held back from starting until this loading sequence finishes, so it isn't wasted playing out unseen behind the loading overlay.

## Deployment
- **Frontend**: Vercel, deployed from the `client` directory.
- **Backend**: Render (free tier), deployed from the `server` directory.
- **Database**: Neon serverless Postgres.
- **Daily stats trigger**: cron-job.org, hitting the protected `/api/fetch-stats` endpoint once a day.

### Environment variables:

| Variable | Where it lives | Purpose |
|---|---|---|
| `DATABASE_URL` | Render | Neon Postgres connection string |
| `GITHUB_TOKEN` | Render | GitHub PAT (read:user, repo scopes) for the GraphQL stats fetch |
| `STATS_CRON_SECRET` | Render + cron-job.org | Protects the `/api/fetch-stats` endpoint from unauthorized triggering |
| `VITE_API_URL` | Vercel | Points the frontend at the live Render backend (must include the `/api` path prefix) |

## Issues Faced During Development
A working log of the real problems hit along the way, largest to smallest, kept here so the same mistakes aren't repeated:
1. **Serverless restructuring crashed the app**. An attempt to move the entire backend from a standalone Express server to Vercel Serverless Functions (to consolidate hosting onto a single free platform) broke the deployed app. The change was reverted via git, and the project went back to the simpler split: Express on Render, static frontend on Vercel.
2. **Render free-tier sleep breaks node-cron**. Render's free web services spin down after ~15 minutes of inactivity, meaning an in-process node-cron job can silently fail to fire if nobody's visited the site recently. Fixed with an external daily trigger (cron-job.org) hitting a protected endpoint, which both wakes the service and runs the fetch.
3. **Frontend API calls were missing the /api path prefix in production**. After deployment, every data-fetching section rendered empty (titles only, no content). The browser console showed plain 404s (not CORS errors) on requests like `/stats`, `/skills`, `/projects` — traced to `VITE_API_URL` being set without the `/api` prefix. Fixed by correcting the environment variable and forcing a fresh Vercel redeploy (Vite bakes env vars in at build time, so just editing the dashboard value isn't enough on its own).
4. **ContactCoinSlot.jsx went through many broken iterations**. Repeated JSX syntax errors (unclosed tags, mismatched braces) and CSS aspect-ratio letterboxing bugs (a cabinet frame `<div>` using `background-size: contain` with a fixed height that didn't match the actual image's proportions, causing all absolutely-positioned children — the coin, slot, form — to render outside the visible artwork). After several rounds of incremental "fix" prompts that reported success but weren't actually true, the component was eventually rewritten in full directly, using an `<img>` element (instead of a CSS background) so the wrapping container's size always exactly matches the rendered artwork with no letterboxing possible.
5. **Antigravity's self-reported "fixed" confirmations weren't always accurate**. On at least two separate occasions (once on `ContactCoinSlot.jsx`, once on a Donkey Kong timing fix), a fix was reported as complete and verified when it either wasn't applied at all or introduced a new bug. The most reliable recovery path turned out to be requesting the actual raw file contents directly for manual inspection, rather than trusting a summary of what was supposedly changed.
6. **Konami terminal state wasn't resetting between sessions**. After the Pong-loss → creeper-blast sequence closed the terminal, reopening it left it permanently stuck in the post-blast state — Pong couldn't be replayed. Fixed by explicitly resetting all internal state (game mode, ball/paddle positions, win/loss flags) whenever the terminal closes, and ensuring React fully unmounts the component on close rather than just hiding it.
7. **An unexpected visual "regression" on the Education card turned out to be a real stray uncommitted edit**. A change nobody intentionally made showed up in the Bloody Roar Education section. Investigated via git diff against the last commit, confirmed as a genuine accidental change (rather than a caching illusion), and cleanly reverted.
8. **Asset paths and file formats repeatedly didn't match what was planned**. Across nearly every asset batch (Contact Us coins, socials ships, easter egg sprites), the actual saved folder location and file extension (`.png` vs `.webp`) differed from the original written plan. This became a recurring source of broken image paths until directory listings were checked before wiring any path, every time.
9. **Ambiguous instructions caused a few wasted round-trips**, most notably a Donkey Kong timing mix-up where "reappear after 20 seconds" was initially implemented as "stay on screen for 20 seconds" — a reminder that duration and interval are two different values that need to be specified unambiguously.
10. **Codolio has no public API**. Initially planned as a live-tracked stat source, it was dropped after confirming no documented programmatic access exists — scraping the profile page was judged too fragile for a long-term reliable feature, and the slot was reassigned to a LeetCode-based stat instead.

## Project Structure

```
loki-portfolio/
├── client/                      # Frontend Vite + React application
│   ├── public/                  # Static assets
│   │   ├── assets/
│   │   │   └── images/          # Image sprites, game framing assets, icons
│   │   │       ├── arcade/      # SEGA chime, arcade reticles
│   │   │       ├── easter-egg/  # Creeper, Minesweeper, Donkey Kong assets
│   │   │       ├── games/       # PVZ peashooter, zombie, pacman, contra
│   │   │       └── projects/    # Project card images
│   │   └── favicon.svg          # Default favicon
│   ├── src/                     # React application source code
│   │   ├── assets/              # Inline SVG / local assets
│   │   ├── components/          # React components
│   │   │   ├── AboutSection.jsx        # About me section
│   │   │   ├── AmbientDonkeyKong.jsx   # Donkey Kong random barrel toss
│   │   │   ├── ArcadeCanvas.jsx        # 3D canvas rendering
│   │   │   ├── CertificationBlocks.jsx # Certification display cards
│   │   │   ├── ContactCoinSlot.jsx     # Arcade coin slot visual
│   │   │   ├── ContactTerminal.jsx     # Terminal interface for contact
│   │   │   ├── EducationBeastMorph.jsx # Beast Morph grid animation
│   │   │   ├── ExperienceRoadRash.jsx  # Road Rash themed experience
│   │   │   ├── ExperienceSection.jsx   # Experience timeline
│   │   │   ├── GalaxianSocials.jsx     # Galaxian ship social links
│   │   │   ├── GlobalEasterEggs.jsx    # Minesweeper orb & sfx state manager
│   │   │   ├── KonamiTerminal.jsx      # Retro Pong terminal & creeper blast
│   │   │   ├── LeaderboardSection.jsx  # Dynamic statistics list
│   │   │   ├── ProjectCard.jsx         # Card component for projects
│   │   │   ├── PvZLoadingScreen.jsx    # Plants vs Zombies preloader
│   │   │   ├── ReticleCursor.jsx       # Custom custom cursor
│   │   │   ├── SkillsMaze.jsx          # Interactive skills maze game
│   │   │   └── TetrisAboutReveal.jsx   # Delayed Tetris block drop
│   │   ├── hooks/
│   │   │   └── useKonamiCode.js # Listener hook for Konami sequence
│   │   ├── services/
│   │   │   └── api.js           # API services calling Express endpoints
│   │   ├── App.jsx              # Main App layout & easter egg mounts
│   │   ├── index.css            # Styling system (Vanilla CSS + Tailwind utilities)
│   │   └── main.jsx             # Entry point
│   ├── package.json             # Frontend script triggers & dependencies
│   ├── tailwind.config.js       # Tailwind configuration file
│   └── vite.config.js           # Vite builder options
├── server/                      # Express.js Backend API
│   ├── config/                  # DB configuration & schema initialization
│   │   ├── db.js                # Neon PostgreSQL client pool
│   │   ├── schema.sql           # Database schema
│   │   └── seed.js              # Database seeder script
│   ├── jobs/
│   │   └── fetchStats.js        # GitHub & LeetCode profile synchronizer
│   ├── routes/                  # Express endpoints
│   │   ├── certifications.js    # GET /api/certifications
│   │   ├── experience.js        # GET /api/experience
│   │   ├── projects.js          # GET /api/projects
│   │   ├── skills.js            # GET /api/skills
│   │   └── stats.js             # GET /api/stats
│   ├── index.js                 # Server entry point & cron schedule configuration
│   └── package.json             # Backend script configurations & dependencies
├── .gitignore                   # Ignored files configuration
└── README.md                    # Main project documentation (this file)
```

## Local Development Setup

### Backend
```bash
cd server
npm install
# create server/.env with DATABASE_URL, GITHUB_TOKEN, STATS_CRON_SECRET
npm start
```

### Frontend
```bash
cd client
npm install
# create client/.env with VITE_API_URL=http://localhost:5000/api
npm run dev
```

To manually trigger a stats sync locally instead of waiting for the cron schedule:
```bash
npm run fetch-stats
```

## Credits
Built by **Mridul Jha**.

Every section pays homage to a specific piece of 1990s–2010s arcade/game history: SEGA's Bloody Roar 2, Namco's Galaxian, Namco's Galaga, Namco's Pac-Man, Nintendo's Super Mario, Alexey Pajitnov's Tetris, EA's Road Rash, EA's Need for Speed: Most Wanted, Nintendo's Donkey Kong, Mojang's Minecraft, PopCap's Plants vs Zombies, Sega The House of The Dead, Sega's The House of The Dead, SEGA's Streets of Rage 2, Oberon Media's Purble Place, SEGA's Sonic The Hedgehog, Rockstar's GTA San Andreas, Konami's Contra, Allen Alcorn's Pong and Midway's Mortal Kombat. This is a fan-tribute portfolio project, not affiliated with or endorsed by any of the original rights holders.
