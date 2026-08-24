import React from 'react';

// Ship definitions with image, label, and correct URLs
const SHIPS = [
  {
    id: 'github',
    src: '/assets/images/socials/galaxian-ship-github.png',
    label: 'GitHub',
    link: 'https://github.com/Loki-Snape/',
  },
  {
    id: 'linkedin',
    src: '/assets/images/socials/galaxian-ship-linkedin.png',
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/mridul-jha/',
  },
  {
    id: 'x',
    src: '/assets/images/socials/galaxian-ship-x.png',
    label: 'X (Twitter)',
    link: 'https://twitter.com/mridul_jha11',
  },
  {
    id: 'codeolio',
    src: '/assets/images/socials/galaxian-ship-codeolio.png',
    label: 'Codeolio',
    link: 'https://codolio.com/profile/Loki-Snape',
  },
  {
    id: 'leetcode',
    src: '/assets/images/socials/galaxian-ship-leetcode.png',
    label: 'LeetCode',
    link: 'https://leetcode.com/u/mridul-jha?utm=codolio',
  },
  {
    id: 'mail',
    src: '/assets/images/socials/galaxian-ship-mail.png',
    label: 'Mail',
    link: 'mailto:himriduljha11@gmail.com',
  },
];

export default function GalaxianSocials() {
  const shipStyle = idx => ({
    position: 'absolute',
    top: '20%',
    left: `${10 + idx * 15}%`,
    width: '120px',
    height: '80px',
    animation: 'drift 4s ease-in-out infinite alternate',
    animationDelay: `${idx * 0.3}s`,
    cursor: 'pointer',
  });

  const playerStyle = {
    position: 'absolute',
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120px',
    height: '120px',
    animation: 'playerDrift 10s ease-in-out infinite alternate',
    animationDelay: '0s',
    cursor: 'default',
  };

  return (
    <section className="relative overflow-hidden h-96 bg-black text-white">
      <h2 className="font-pixel text-sega-gold text-center text-2xl mb-4">Social Links</h2>
      {SHIPS.map((ship, idx) => (
        <a
          key={ship.id}
          href={ship.link}
          target="_blank"
          rel="noopener noreferrer"
          style={shipStyle(idx)}
        >
          <img src={ship.src} alt={ship.label} style={{ width: '100%', height: '100%' }} />
        </a>
      ))}
      <img src="/assets/images/socials/galaxian-ship.png" alt="Player" style={playerStyle} />
      <style jsx>{`
        @keyframes drift {
          from { transform: translateX(-10px); }
          to { transform: translateX(10px); }
        }
        @keyframes playerDrift {
          from { transform: translateX(-45vw); }
          to { transform: translateX(45vw); }
        }
      `}</style>
    </section>
  );
}
