import React, { useState, useEffect } from 'react';

export default function PvZLoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'fire' | 'hit' | 'fade'

  useEffect(() => {
    // 1. Idle phase (1000ms)
    const tFire = setTimeout(() => {
      setPhase('fire');
    }, 1000);

    // 2. Fire phase (1500ms travel time, so 1000 + 1500 = 2500ms)
    const tHit = setTimeout(() => {
      setPhase('hit');
    }, 2500);

    // 3. Hit reaction phase (600ms shake/flash, so 2500 + 600 = 3100ms)
    const tFade = setTimeout(() => {
      setPhase('fade');
    }, 3100);

    // 4. Fade overlay out phase (400ms transition, so 3100 + 400 = 3500ms)
    const tDone = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(tFire);
      clearTimeout(tHit);
      clearTimeout(tFade);
      clearTimeout(tDone);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-[#080810] z-50 flex flex-col justify-center items-center select-none overflow-hidden ${
        phase === 'fade' ? 'animate-overlay-fade' : ''
      }`}
    >
      <style>{`
        /* Pea travel animation (1.5s linear) */
        @keyframes peaFly {
          from { left: 95px; opacity: 1; }
          to { left: calc(100% - 95px); opacity: 1; }
        }
        .animate-pea {
          animation: peaFly 1.5s linear forwards;
        }

        /* Zombie hit shake & flash red effect (0.6s) */
        @keyframes zombieHit {
          0%, 100% { transform: translateX(0); filter: brightness(1) sepia(0); }
          20%, 60% { transform: translateX(5px) rotate(4deg); filter: brightness(1.6) sepia(1) hue-rotate(-50deg) saturate(3); }
          40%, 80% { transform: translateX(-3px) rotate(-4deg); filter: brightness(1.6) sepia(1) hue-rotate(-50deg) saturate(3); }
        }
        .animate-zombie-hit {
          animation: zombieHit 0.6s ease-in-out forwards;
        }

        /* Loading overlay fade out */
        @keyframes overlayFade {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .animate-overlay-fade {
          animation: overlayFade 0.4s ease-out forwards;
        }
      `}</style>

      {/* Loading Scene Frame */}
      <div className="relative w-[480px] max-w-[90vw] h-64 flex flex-col justify-end pb-8">
        
        {/* Simple Ground Line */}
        <div className="absolute bottom-8 left-0 right-0 border-b-2 border-stone-800/80" />

        {/* Peashooter (Left side) */}
        <div className="absolute left-4 bottom-8 w-20 h-20 flex items-center justify-center">
          <img
            src="/assets/images/games/peashooter.webp"
            alt="Peashooter"
            className="w-full h-full object-contain"
          />
        </div>

        {/* The Pea (Fires during fire phase, aligned to mouth height) */}
        {phase === 'fire' && (
          <div
            className="absolute bottom-[102px] w-4 h-4 bg-green-500 rounded-full border-2 border-green-700 shadow-[0_0_6px_rgba(34,197,94,0.6)] animate-pea z-20"
          />
        )}

        {/* Zombie (Right side) */}
        <div
          className={`absolute right-4 bottom-8 w-20 h-24 flex items-center justify-center ${
            phase === 'hit' ? 'animate-zombie-hit' : ''
          }`}
        >
          <img
            src="/assets/images/games/zombie.webp"
            alt="Zombie"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Subtle Loading text */}
      <p className="font-pixel text-[10px] text-stone-600 tracking-wider mt-4 animate-pulse">
        LOADING CONSOLE SYSTEM...
      </p>
    </div>
  );
}
