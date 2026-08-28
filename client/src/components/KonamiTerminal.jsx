import React, { useState, useEffect } from 'react';

function PongGame({ onWin, onLose }) {
  const [ball, setBall] = useState({ x: 250, y: 150, vx: 4, vy: 2 });
  const [playerY, setPlayerY] = useState(125);
  const [cpuY, setCpuY] = useState(125);

  const arenaWidth = 500;
  const arenaHeight = 300;
  const paddleHeight = 50;
  const paddleWidth = 8;
  const ballSize = 8;

  // Handle player paddle controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        setPlayerY(y => Math.max(0, y - 25));
        e.preventDefault();
      }
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        setPlayerY(y => Math.min(arenaHeight - paddleHeight, y + 25));
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main game loop (60 FPS)
  useEffect(() => {
    const interval = setInterval(() => {
      setBall(b => {
        let { x, y, vx, vy } = b;

        let nextX = x + vx;
        let nextY = y + vy;

        // Top/bottom wall bounce
        if (nextY <= 0) {
          nextY = 0;
          vy = -vy;
        } else if (nextY >= arenaHeight - ballSize) {
          nextY = arenaHeight - ballSize;
          vy = -vy;
        }

        // Left paddle (player) bounce
        if (vx < 0 && nextX <= 15 + paddleWidth && nextX >= 15) {
          if (nextY + ballSize >= playerY && nextY <= playerY + paddleHeight) {
            vx = -vx * 1.05; // speed up slightly on hits
            vy = vy + (nextY - (playerY + paddleHeight / 2)) * 0.12; // add angle variation
            nextX = 15 + paddleWidth;
          }
        }

        // Right paddle (CPU) bounce
        const cpuX = arenaWidth - 15 - paddleWidth;
        if (vx > 0 && nextX + ballSize >= cpuX && nextX + ballSize <= cpuX + paddleWidth) {
          if (nextY + ballSize >= cpuY && nextY <= cpuY + paddleHeight) {
            vx = -vx * 1.05;
            vy = vy + (nextY - (cpuY + paddleHeight / 2)) * 0.12;
            nextX = cpuX - ballSize;
          }
        }

        // Score check (out of bounds)
        if (nextX < 0) {
          clearInterval(interval);
          onLose();
          return b;
        }
        if (nextX > arenaWidth) {
          clearInterval(interval);
          onWin();
          return b;
        }

        return { x: nextX, y: nextY, vx, vy };
      });

      // Simple CPU AI tracking ball with delay/lag
      setCpuY(cy => {
        const ballCenter = ball.y + ballSize / 2;
        const cpuCenter = cy + paddleHeight / 2;
        const diff = ballCenter - cpuCenter;
        const cpuSpeed = 3.5; // limit CPU speed to make it beatable
        const move = Math.max(-cpuSpeed, Math.min(cpuSpeed, diff * 0.12));
        return Math.max(0, Math.min(arenaHeight - paddleHeight, cy + move));
      });

    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [ball.y, playerY, cpuY, onWin, onLose]);

  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex justify-between w-[500px] mb-2 text-xs text-sega-gold font-pixel">
        <span>PLAYER (L)</span>
        <span>VS</span>
        <span>CPU (R)</span>
      </div>

      <div 
        className="relative bg-black border-2 border-stone-800 rounded overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.9)]"
        style={{ width: `${arenaWidth}px`, height: `${arenaHeight}px` }}
      >
        {/* Net */}
        <div className="absolute left-1/2 top-0 bottom-0 border-l-2 border-dashed border-stone-900 -translate-x-1/2" />

        {/* Player paddle */}
        <div 
          className="absolute bg-arcade-red rounded-sm"
          style={{
            left: '15px',
            top: `${playerY}px`,
            width: `${paddleWidth}px`,
            height: `${paddleHeight}px`,
            boxShadow: '0 0 6px rgba(255, 0, 51, 0.6)',
          }}
        />

        {/* CPU paddle */}
        <div 
          className="absolute bg-sonic-blue rounded-sm"
          style={{
            right: '15px',
            top: `${cpuY}px`,
            width: `${paddleWidth}px`,
            height: `${paddleHeight}px`,
            boxShadow: '0 0 6px rgba(0, 85, 255, 0.6)',
          }}
        />

        {/* Ball */}
        <div 
          className="absolute bg-white rounded-full"
          style={{
            left: `${ball.x}px`,
            top: `${ball.y}px`,
            width: `${ballSize}px`,
            height: `${ballSize}px`,
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)',
          }}
        />
      </div>
      <div className="mt-2 text-[10px] text-stone-500 font-pixel">
        Use W/S or UP/DOWN arrows to control paddle
      </div>
    </div>
  );
}

export default function KonamiTerminal({ activated, onClose }) {
  const [activeMode, setActiveMode] = useState('normal'); // 'normal' | 'pong' | 'win' | 'creeper'

  // Global keydown listeners inside the terminal
  useEffect(() => {
    if (!activated) return;

    let pongIndex = 0;
    const pongSeq = 'PONG';

    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Only check PONG trigger in normal mode
      if (activeMode === 'normal') {
        const key = e.key.toUpperCase();
        if (key === pongSeq[pongIndex]) {
          pongIndex++;
          if (pongIndex === pongSeq.length) {
            setActiveMode('pong');
            pongIndex = 0;
          }
        } else {
          pongIndex = key === pongSeq[0] ? 1 : 0;
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [activated, activeMode, onClose]);

  // Handle creeper blast exit timeout
  useEffect(() => {
    if (activeMode === 'creeper') {
      const t = setTimeout(() => {
        onClose();
      }, 900);
      return () => clearTimeout(t);
    }
  }, [activeMode, onClose]);

  // Handle win recovery timeout
  useEffect(() => {
    if (activeMode === 'win') {
      const t = setTimeout(() => {
        setActiveMode('normal');
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [activeMode]);

  if (!activated) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in-quick">
      <style>{`
        /* Creeper scaling and coloring animation */
        @keyframes creeperBlast {
          0% { transform: scale(0.2); filter: brightness(1) invert(0); }
          50% { transform: scale(1.3); filter: brightness(2) invert(0.2); }
          80% { transform: scale(2.5); filter: brightness(4) invert(0.5); }
          100% { transform: scale(4.5); filter: brightness(10) invert(1); }
        }
        .animate-creeper {
          animation: creeperBlast 0.9s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;
        }

        /* Screen shake keyframes */
        @keyframes screenShake {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5px, 5px); }
          20% { transform: translate(5px, -5px); }
          30% { transform: translate(-5px, -5px); }
          40% { transform: translate(5px, 5px); }
          50% { transform: translate(-5px, 5px); }
          60% { transform: translate(5px, -5px); }
          70% { transform: translate(-5px, -5px); }
          80% { transform: translate(5px, 5px); }
          90% { transform: translate(-5px, -5px); }
        }
        .animate-shake {
          animation: screenShake 0.1s infinite;
        }

        @keyframes fadeInQuick {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-quick {
          animation: fadeInQuick 0.25s ease-out forwards;
        }
      `}</style>

      {/* Terminal window */}
      <div 
        className="relative bg-[#0a0a0f] border-2 border-stone-800 rounded p-6 shadow-2xl flex flex-col items-center justify-center text-center font-pixel min-w-[550px] min-h-[380px] overflow-hidden"
        style={{
          boxShadow: '0 0 30px rgba(255, 0, 51, 0.15), inset 0 0 100px rgba(0, 0, 0, 0.95)'
        }}
      >
        {activeMode === 'normal' && (
          <div className="flex flex-col items-center">
            <h1 className="text-arcade-red text-4xl mb-4 animate-pulse tracking-wide select-none drop-shadow-[0_2px_8px_rgba(255,0,51,0.5)]">
              30 LIVES ADDED
            </h1>
            <h2 className="text-sega-gold text-lg mb-6 tracking-wide select-none">
              CHEAT MODE UNLOCKED
            </h2>
            <div className="border border-stone-800/80 bg-[#0d0d15] rounded px-4 py-3 mt-2">
              <p className="text-stone-400 text-xs tracking-wider">
                TYPE <span className="text-sega-gold animate-pulse">"PONG"</span> TO INITIATE TEST MISSION
              </p>
            </div>
            <p className="text-stone-600 text-[10px] mt-8 select-none">
              Press ESC to terminate console
            </p>
          </div>
        )}

        {activeMode === 'pong' && (
          <PongGame 
            onWin={() => setActiveMode('win')} 
            onLose={() => setActiveMode('creeper')} 
          />
        )}

        {activeMode === 'win' && (
          <div className="flex flex-col items-center animate-fade-in-quick">
            <h1 className="text-green-500 text-4xl mb-4 animate-bounce drop-shadow-[0_2px_8px_rgba(34,197,94,0.4)]">
              YOU WIN!
            </h1>
            <p className="text-stone-500 text-xs tracking-wide">
              RESTORING CONSOLE SYSTEM...
            </p>
          </div>
        )}

        {activeMode === 'creeper' && (
          <div className="absolute inset-0 bg-[#0c0c0c] flex items-center justify-center overflow-hidden animate-shake">
            <img 
              src="/assets/images/easter-egg/creeper-face.webp" 
              alt="CREEPER" 
              className="w-full h-full object-contain animate-creeper"
            />
          </div>
        )}
      </div>
    </div>
  );
}
