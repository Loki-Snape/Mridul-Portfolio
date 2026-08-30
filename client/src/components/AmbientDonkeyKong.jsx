import React, { useState, useEffect } from 'react';

export default function AmbientDonkeyKong() {
  const [dkVisible, setDkVisible] = useState(false);
  const [side, setSide] = useState('right'); // 'left' | 'right'
  const [barrels, setBarrels] = useState([]); // Array of IDs or numbers to trigger rendering

  useEffect(() => {
    let timeoutId;

    const triggerDK = () => {
      const chosenSide = Math.random() > 0.5 ? 'left' : 'right';
      setSide(chosenSide);
      setDkVisible(true);
      setBarrels([]);

      // Staggered barrel throws
      const barrelTimers = [
        setTimeout(() => setBarrels(arr => [...arr, 1]), 600),
        setTimeout(() => setBarrels(arr => [...arr, 2]), 1300),
        setTimeout(() => setBarrels(arr => [...arr, 3]), 2000),
      ];

      // Reset everything after 4.5s
      const resetTimer = setTimeout(() => {
        setDkVisible(false);
        setBarrels([]);
        scheduleNext();
      }, 4500);

      return () => {
        barrelTimers.forEach(clearTimeout);
        clearTimeout(resetTimer);
      };
    };

    const scheduleNext = () => {
      // Reappear exactly 20 seconds after the previous one ended
      timeoutId = setTimeout(triggerDK, 20000);
    };

    // Start the first interval sequence
    scheduleNext();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <style>{`
        /* DK Slide-in animations from top corner */
        @keyframes dkSlideLeft {
          0% { transform: translateX(-120%); }
          15% { transform: translateX(0); }
          85% { transform: translateX(0); }
          100% { transform: translateX(-120%); }
        }
        @keyframes dkSlideRight {
          0% { transform: translateX(120%); }
          15% { transform: translateX(0); }
          85% { transform: translateX(0); }
          100% { transform: translateX(120%); }
        }
        .animate-dk-left {
          animation: dkSlideLeft 4.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .animate-dk-right {
          animation: dkSlideRight 4.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        /* Straight downward fall for barrels */
        @keyframes barrelFall {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(85vh) rotate(1080deg); opacity: 0; }
        }

        .animate-barrel-fall {
          animation: barrelFall 2.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>

      {/* Donkey Kong Sprite */}
      {dkVisible && (
        <div
          className={`fixed top-12 ${side === 'left' ? 'left-4 animate-dk-left' : 'right-4 animate-dk-right'
            } w-24 h-24 z-40 pointer-events-none select-none`}
        >
          <img
            src="/assets/images/easter-egg/dk.png"
            alt="Donkey Kong"
            className={`w-full h-full object-contain ${side === 'left' ? 'scale-x-[-1]' : ''}`}
          />

          {/* Render active barrels relative to DK's launch position */}
          {barrels.map(id => (
            <div
              key={id}
              className={`absolute top-6 ${side === 'left' ? 'left-6' : 'right-6'
                } animate-barrel-fall w-16 h-16 z-30 pointer-events-none`}
            >
              <img
                src="/assets/images/easter-egg/dk-barrel.png"
                alt="Barrel"
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
