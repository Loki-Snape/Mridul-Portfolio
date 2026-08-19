import React, { useState, useEffect, useRef } from "react";

const categoryColors = {
  frontend: "bg-sonic-blue",
  backend: "bg-arcade-red",
  database: "bg-sega-gold text-crt-black",
};

const COLUMNS = 5;

function buildGridPositions(skills) {
  return skills.map((skill, i) => {
    const row = Math.floor(i / COLUMNS);
    const col = i % COLUMNS;
    return { skill, row, col };
  });
}

export default function SkillsMaze({ skills }) {
  const [progress, setProgress] = useState(0);
  const [eatenIds, setEatenIds] = useState([]);
  const intervalRef = useRef(null);

  const grid = buildGridPositions(skills);
  const rowCount = Math.max(1, Math.ceil(skills.length / COLUMNS));
  const total = skills.length;

  const posForProgress = (p) => {
    const idx = Math.floor(p) % total;
    const nextIdx = (idx + 1) % total;
    const t = p - Math.floor(p);
    const a = grid[idx];
    const b = grid[nextIdx];
    if (!a || !b) return { xPct: 50, yPct: 50 };
    if (a.row === b.row) {
      const ax = ((a.col + 0.5) / COLUMNS) * 100;
      const ay = ((a.row + 0.5) / rowCount) * 100;
      const bx = ((b.col + 0.5) / COLUMNS) * 100;
      const by = ((b.row + 0.5) / rowCount) * 100;
      return { xPct: ax + (bx - ax) * t, yPct: ay + (by - ay) * t };
    }
    if (t < 0.5) {
      return { xPct: 105, yPct: ((a.row + 0.5) / rowCount) * 100 };
    } else {
      const enterT = (t - 0.5) * 2;
      const bx = ((b.col + 0.5) / COLUMNS) * 100;
      const by = ((b.row + 0.5) / rowCount) * 100;
      return { xPct: -5 + (bx - -5) * enterT, yPct: by };
    }
  };

  useEffect(() => {
    if (total === 0) return;
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = (prev + 0.03) % total;
        const pacIdx = Math.floor(next) % total;
        const clydeProgress = (next - 3 + total) % total;
        const clydeIdx = Math.floor(clydeProgress) % total;
        setEatenIds((prevEaten) => {
          const set = new Set(prevEaten);
          const pacSkill = grid[pacIdx]?.skill;
          const clydeSkill = grid[clydeIdx]?.skill;
          if (pacSkill) set.add(pacSkill.id);
          if (clydeSkill) set.delete(clydeSkill.id);
          return Array.from(set);
        });
        return next;
      });
    }, 60);
    return () => clearInterval(intervalRef.current);
  }, [total]);

  const pacPos = posForProgress(progress);
  const ghostOffsets = [0.7, 1.4, 2.1, 2.8];
  const ghostImgs = [
    "/assets/images/games/ghost-blinky.webp",
    "/assets/images/games/ghost-pinky.webp",
    "/assets/images/games/ghost-inky.webp",
    "/assets/images/games/ghost-clyde.webp",
  ];

  return (
    <section className="py-8 px-4">
      <h2 className="font-pixel text-sega-gold text-center text-2xl mb-6">Skills</h2>
      <div
        className="relative w-full overflow-hidden"
        style={{ height: `${rowCount * 70}px` }}
      >
        {grid.map(({ skill, row, col }) => {
          const isEaten = eatenIds.includes(skill.id);
          const bgClass = categoryColors[skill.category] || "bg-gray-600";
          return (
            <div
              key={skill.id}
              className={`${bgClass} text-crt-black font-code text-[10px] rounded-full px-1.5 py-0.5 absolute transition-opacity duration-300`}
              style={{
                left: `${((col + 0.5) / COLUMNS) * 100}%`,
                top: `${((row + 0.5) / rowCount) * 100}%`,
                transform: "translate(-50%, -50%)",
                opacity: isEaten ? 0 : 1,
                pointerEvents: isEaten ? "none" : "auto",
                whiteSpace: "nowrap",
              }}
            >
              {skill.name}
            </div>
          );
        })}

        <div
          className="absolute pointer-events-none"
          style={{
            left: `${pacPos.xPct}%`,
            top: `${pacPos.yPct}%`,
            transform: "translate(-50%, -50%)",
            width: "64px",
            height: "64px",
            zIndex: 20,
            backgroundImage: "url(/assets/images/games/pacman-sprite.png)",
            backgroundSize: "200% 100%",
            backgroundPosition: Math.floor(progress * 4) % 2 === 0 ? "0% 0%" : "100% 0%",
            backgroundRepeat: "no-repeat",
          }}
        />

        {ghostOffsets.map((offset, i) => {
          const gp = posForProgress((progress - offset + total) % total);
          return (
            <img
              key={i}
              src={ghostImgs[i]}
              alt="ghost"
              className="absolute pointer-events-none w-16 h-16"
              style={{
                left: `${gp.xPct}%`,
                top: `${gp.yPct}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 19 - i,
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
