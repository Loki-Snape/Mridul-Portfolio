import React, { useEffect, useState } from 'react';
import { getStats } from '../services/api';

export default function LeaderboardSection() {
  const [inView, setInView] = useState(false);
  const [stats, setStats] = useState({
    github_streak: 47,
    github_stars: 26,
    leetcode_solved: 310,
    leetcode_total: 3300,
    leetcode_rank: 82431,
    leetcode_rating: 1650,
    leetcode_badge: ''
  });

  useEffect(() => {
    // Fetch stats from Express API
    getStats().then(data => {
      if (data) {
        setStats(data);
      }
    });

    // A simple intersection observer to trigger animations when the section is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const el = document.getElementById('blacklist-section');
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const blacklistData = [
    {
      rank: '01',
      title: 'GitHub Streak',
      value: `${stats.github_streak} day streak`,
      isTop: true,
      tilt: '-rotate-1',
    },
    {
      rank: '02',
      title: 'LeetCode Streak',
      value: `${stats.leetcode_streak} day streak`,
      tilt: 'rotate-1',
    },
    {
      rank: '03',
      title: 'LeetCode Rank',
      value: `Rank ${stats.leetcode_rank.toLocaleString()}`,
      tilt: '-rotate-2',
    },
    {
      rank: '04',
      title: 'Total Project Stars',
      value: `${stats.github_stars} stars`,
      tilt: 'rotate-2',
    },
    {
      rank: '05',
      title: 'LeetCode Rating',
      value: stats.leetcode_badge 
        ? `${stats.leetcode_rating} rating (${stats.leetcode_badge})` 
        : `${stats.leetcode_rating} rating`,
      tilt: '-rotate-1',
    },
    {
      rank: '06',
      title: 'LeetCode Solved',
      value: `${stats.leetcode_solved}/${stats.leetcode_total} solved`,
      tilt: 'rotate-1',
    },
  ];

  return (
    <section
      id="blacklist-section"
      className="relative flex flex-col items-center py-16 px-4 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Load Google Fonts dynamically for this section */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Permanent+Marker&family=Kalam:wght@400;700&family=Press+Start+2P&display=swap');

        /* Board grunge texture & shadow */
        .blacklist-board {
          background-color: #141414;
          background-image: 
            radial-gradient(circle at 30% 20%, rgba(40, 40, 40, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 80% 70%, rgba(20, 20, 20, 0.4) 0%, rgba(5, 5, 5, 0.95) 100%),
            repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.01) 0px, rgba(255, 255, 255, 0.01) 1px, transparent 1px, transparent 6px);
          box-shadow: 
            inset 0 0 100px rgba(0, 0, 0, 0.95),
            0 25px 50px -12px rgba(0, 0, 0, 0.7);
        }

        /* Scratches effect */
        .blacklist-scratches {
          position: absolute;
          inset: 0;
          opacity: 0.07;
          pointer-events: none;
          background-image: 
            linear-gradient(105deg, transparent 40%, #fff 40.5%, #fff 41%, transparent 41.5%),
            linear-gradient(15deg, transparent 70%, #fff 70.2%, #fff 70.5%, transparent 70.8%),
            linear-gradient(125deg, transparent 20%, #fff 20.3%, #fff 20.6%, transparent 21%);
        }

        /* Animations */
        @keyframes strikeThrough {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }

        .animate-strike {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: strikeThrough 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes cursorBlink {
          50% { opacity: 0; }
        }

        .cursor-blink {
          animation: cursorBlink 0.8s step-end infinite;
        }

        /* Fade-in transitions */
        .fade-enter {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .fade-enter-active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Main Grunge Board Container */}
      <div className="blacklist-board relative w-full max-w-2xl border-4 border-[#222] rounded-lg px-6 py-10 sm:px-12 md:py-14 z-10">
        <div className="blacklist-scratches" />

        {/* Board Frame Border Details (Hand-drawn feel screws) */}
        <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-[#333] border border-[#111]" />
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-[#333] border border-[#111]" />
        <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-[#333] border border-[#111]" />
        <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-[#333] border border-[#111]" />

        {/* Headings */}
        <div className="text-center mb-10 select-none">
          <h2 className="font-pixel text-3xl sm:text-4xl text-sega-gold tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            BLACKLIST
          </h2>
          <p 
            className="text-arcade-red text-xl sm:text-2xl mt-1 tracking-wider"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Most Wanted Status
          </p>
        </div>

        {/* List Entries */}
        <div className="flex flex-col gap-6 relative">
          {blacklistData.map((item, index) => {
            const delay = index * 200;
            return (
              <div
                key={item.rank}
                className={`fade-enter ${inView ? 'fade-enter-active' : ''} ${item.tilt} relative flex items-center bg-[#181818]/60 hover:bg-[#202020]/80 border border-[#2a2a2a]/30 rounded px-4 py-3 transition-all duration-300 group`}
                style={{
                  transitionDelay: `${delay}ms`,
                  boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
                }}
              >
                {/* Grungy blood/chalk marker smudge background behind crossed items */}
                {!item.isTop && (
                  <div className="absolute inset-0 bg-radial-gradient from-arcade-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                )}

                {/* Big Rank Number */}
                <div
                  className={`text-3xl sm:text-4xl mr-6 select-none font-bold tracking-tighter ${
                    item.isTop ? 'text-sega-gold animate-pulse' : 'text-stone-500/80 line-through decoration-arcade-red/40'
                  }`}
                  style={{ 
                    fontFamily: "'Permanent Marker', cursive",
                    textShadow: item.isTop ? '0 0 8px rgba(221,170,51,0.3)' : 'none'
                  }}
                >
                  {item.rank}
                </div>

                {/* Info block */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pr-6 relative">
                  {/* Stat Title */}
                  <span
                    className={`text-lg sm:text-xl font-bold tracking-wide ${
                      item.isTop ? 'text-stone-100' : 'text-stone-400'
                    }`}
                    style={{ fontFamily: "'Kalam', cursive" }}
                  >
                    {item.title}
                  </span>

                  {/* Stat Value */}
                  <span
                    className={`text-lg sm:text-xl font-bold tracking-wide text-right ${
                      item.isTop ? 'text-sega-gold' : 'text-stone-500'
                    }`}
                    style={{ fontFamily: "'Kalam', cursive" }}
                  >
                    {item.value}
                  </span>

                  {/* Terminal Cursor for Top Active Rank */}
                  {item.isTop && (
                    <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-sega-gold text-lg font-bold cursor-blink">
                      _
                    </span>
                  )}
                </div>

                {/* STRIKETHROUGH EFFECT: Animated SVG Red Marker Stroke for ranks 2-5 */}
                {!item.isTop && inView && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center px-2">
                    <svg
                      className="w-full h-12 opacity-85"
                      viewBox="0 0 500 40"
                      preserveAspectRatio="none"
                    >
                      <path
                        // A rough, slightly wavy path representing a marker swipe
                        d={`M 5,${20 + Math.sin(index) * 4} Q 150,${15 - Math.cos(index) * 3} 300,${22 + Math.sin(index) * 2} T 495,${18 + Math.cos(index) * 3}`}
                        stroke="#ff2a2a"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        className="animate-strike"
                        style={{
                          animationDelay: `${delay + 800}ms`,
                        }}
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
