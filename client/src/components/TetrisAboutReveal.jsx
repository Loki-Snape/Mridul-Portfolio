import React, { useState, useEffect } from "react";

const ROWS = 4;
const COLS = 6;

const O_CELLS = [
  { r: 0, c: 3 }, { r: 0, c: 4 },
  { r: 1, c: 3 }, { r: 1, c: 4 },
];
const I_CELLS = [
  { r: 0, c: 5 }, { r: 1, c: 5 }, { r: 2, c: 5 }, { r: 3, c: 5 },
];

function isReserved(r, c) {
  return (
    O_CELLS.some((cell) => cell.r === r && cell.c === c) ||
    I_CELLS.some((cell) => cell.r === r && cell.c === c)
  );
}

function buildStaticCells() {
  const colors = ["bg-sonic-blue", "bg-arcade-red", "bg-sega-gold-dark", "bg-arcade-red-dark"];
  const cells = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!isReserved(r, c)) {
        cells.push({ r, c, color: colors[(r + c) % colors.length] });
      }
    }
  }
  return cells;
}

const PIECES = [
  { id: "O", colorClass: "bg-arcade-red", cells: O_CELLS },
  { id: "I", colorClass: "bg-sega-gold", cells: I_CELLS },
];

export default function TetrisAboutReveal({ children }) {
  const [staticCells] = useState(buildStaticCells);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clearing, setClearing] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const dropInterval = 700;
    let i = 0;
    const dropTimer = setInterval(() => {
      i += 1;
      setCurrentIndex(i);
      if (i >= PIECES.length) {
        clearInterval(dropTimer);
        setTimeout(() => setClearing(true), 600);
        setTimeout(() => setDone(true), 1100);
      }
    }, dropInterval);
    return () => clearInterval(dropTimer);
  }, []);

  return (
    <section className="relative py-8 px-4">
      <div className="relative max-w-3xl mx-auto" style={{ minHeight: "340px" }}>
        <div className={`transition-opacity duration-700 ${done ? "opacity-100" : "opacity-0"}`}>
          {children}
        </div>
        {!done && (
          <div
            className="absolute top-0 left-0 right-0 overflow-hidden"
            style={{ height: "300px", zIndex: 30 }}
          >
            {staticCells.map((cell, idx) => (
              <div
                key={`static-${idx}`}
                className={`${cell.color} border border-crt-black`}
                style={{
                  position: "absolute",
                  top: `${(cell.r / ROWS) * 100}%`,
                  left: `${(cell.c / COLS) * 100}%`,
                  width: `${(1 / COLS) * 100}%`,
                  height: `${(1 / ROWS) * 100}%`,
                  opacity: clearing ? 0 : 1,
                  transition: "opacity 0.35s ease-out",
                }}
              />
            ))}
            {PIECES.map((piece, pIdx) => {
              const dropped = pIdx < currentIndex;
              return piece.cells.map((cell, ci) => (
                <div
                  key={`${piece.id}-${ci}`}
                  className={`${piece.colorClass} border border-crt-black`}
                  style={{
                    position: "absolute",
                    top: `${(cell.r / ROWS) * 100}%`,
                    left: `${(cell.c / COLS) * 100}%`,
                    width: `${(1 / COLS) * 100}%`,
                    height: `${(1 / ROWS) * 100}%`,
                    transform: dropped ? "translateY(0)" : "translateY(-450px)",
                    opacity: clearing ? 0 : 1,
                    transition: "transform 0.5s ease-in, opacity 0.35s ease-out",
                  }}
                />
              ));
            })}
          </div>
        )}
      </div>
    </section>
  );
}
