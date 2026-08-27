import React, { useState, useEffect } from 'react';

export default function GlobalEasterEggs() {
  const [baitState, setBaitState] = useState('orb'); // 'orb' | 'bomb' | 'blanked'
  const [showSegaLogo, setShowSegaLogo] = useState(false);

  useEffect(() => {
    let hesoyamIndex = 0;
    const hesoyamSeq = 'HESOYAM';

    let segaIndex = 0;
    const segaSeq = 'SEGA';

    const handleKeydown = (e) => {
      const key = e.key.toUpperCase();

      // HESOYAM sequence check (only when page is blanked)
      if (baitState === 'blanked') {
        if (key === hesoyamSeq[hesoyamIndex]) {
          hesoyamIndex++;
          if (hesoyamIndex === hesoyamSeq.length) {
            setBaitState('orb'); // Revert back to orb
            hesoyamIndex = 0;
          }
        } else {
          hesoyamIndex = key === hesoyamSeq[0] ? 1 : 0;
        }
      }

      // SEGA sequence check (always active unless logo is already showing)
      if (!showSegaLogo) {
        if (key === segaSeq[segaIndex]) {
          segaIndex++;
          if (segaIndex === segaSeq.length) {
            triggerSegaChime();
            segaIndex = 0;
          }
        } else {
          segaIndex = key === segaSeq[0] ? 1 : 0;
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [baitState, showSegaLogo]);

  // Effect to toggle the blanked-state class on document.body
  useEffect(() => {
    if (baitState === 'blanked') {
      document.body.classList.add('blanked-state');
    } else {
      document.body.classList.remove('blanked-state');
    }
    // Clean up on unmount
    return () => {
      document.body.classList.remove('blanked-state');
    };
  }, [baitState]);

  const triggerBaitClick = () => {
    if (baitState !== 'orb') return;
    setBaitState('bomb');
    setTimeout(() => {
      setBaitState('blanked');
    }, 350);
  };

  const triggerSegaChime = () => {
    setShowSegaLogo(true);
    try {
      const audio = new Audio('/assets/images/easter-egg/sega-chime.mp3');
      audio.volume = 0.8;
      audio.play();
    } catch (err) {
      console.error('Sega chime play failed:', err);
    }
    setTimeout(() => {
      setShowSegaLogo(false);
    }, 2000);
  };

  return (
    <>
      <style>{`
        /* Scoped transition for Three.js canvas */
        canvas {
          transition: opacity 1.8s ease-in-out !important;
        }

        /* Blanked state CSS rules */
        body.blanked-state #app-main-ui-layer {
          opacity: 0 !important;
          transform: scale(0.98) !important;
          pointer-events: none !important;
        }
        body.blanked-state canvas {
          opacity: 0 !important;
          pointer-events: none !important;
        }

        /* Glowing/pulsing orb effect */
        @keyframes pulseGlow {
          0% { filter: drop-shadow(0 0 3px #ffaa00) brightness(1); transform: scale(1); }
          50% { filter: drop-shadow(0 0 12px #ffaa00) brightness(1.2); transform: scale(1.08); }
          100% { filter: drop-shadow(0 0 3px #ffaa00) brightness(1); transform: scale(1); }
        }
        .animate-pulse-glow {
          animation: pulseGlow 1.8s infinite ease-in-out;
        }

        /* Sega logo slide/scale/fade effect */
        @keyframes segaFadeInOut {
          0% { opacity: 0; transform: scale(0.85); }
          15% { opacity: 1; transform: scale(1); }
          85% { opacity: 1; transform: scale(1.02); }
          100% { opacity: 0; transform: scale(0.95); }
        }
        .animate-sega-flow {
          animation: segaFadeInOut 2.0s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>

      {/* Feature 1: Minesweeper Bait Orb / Bomb element */}
      {baitState !== 'blanked' && (
        <div
          onClick={triggerBaitClick}
          className="fixed bottom-4 right-4 w-12 h-12 z-40 cursor-pointer select-none transition-transform duration-100 hover:scale-110 active:scale-95"
          title="Click for a bonus!"
        >
          {baitState === 'orb' ? (
            <img
              src="/assets/images/easter-egg/bait-bonus-orb.webp"
              alt="Bonus Orb"
              className="w-full h-full object-contain animate-pulse-glow"
            />
          ) : (
            <img
              src="/assets/images/easter-egg/minesweeper-bomb.webp"
              alt="Bomb"
              className="w-full h-full object-contain"
            />
          )}
        </div>
      )}

      {/* Feature 2: Sega Logo overlay */}
      {showSegaLogo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-md animate-sega-flow">
          <img
            src="/assets/images/arcade/sega-font-logo.png"
            alt="Mridul Jha"
            className="w-96 max-w-[80vw] h-auto object-contain"
          />
        </div>
      )}
    </>
  );
}
