import React, { useState, useEffect, useRef } from "react";

export default function ExperienceRoadRash({ experience }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [t, setT] = useState(0);
  const startRef = useRef(null);
  const DURATION = 10000;
  const total = experience.length;

  useEffect(() => {
    if (total === 0) return;
    startRef.current = performance.now();
    const tick = setInterval(() => {
      const elapsed = performance.now() - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      setT(progress);
      if (progress >= 1) {
        setActiveIndex((i) => (i + 1) % total);
        startRef.current = performance.now();
        setT(0);
      }
    }, 30);
    return () => clearInterval(tick);
  }, [activeIndex, total]);

  if (total === 0) return null;
  const current = experience[activeIndex];

  const startZ = -1800;
  const endZ = 150;
  const z = startZ + t * (endZ - startZ);
  const x = t < 0.7 ? -300 + (t / 0.7) * 300 : ((t - 0.7) / 0.3) * 500;
const scale = 0.9 + t * 0.35;
  const opacity = t > 0.85 ? Math.max(0, 1 - (t - 0.85) / 0.15) : 1;

  return (
    <section className="py-8 px-4">
      <h2 className="font-pixel text-sega-gold text-center text-2xl mb-6">
        Experience &amp; Leadership
      </h2>
      <div
        className="relative mx-auto overflow-hidden rounded"
        style={{
          height: "420px",
          maxWidth: "900px",
          perspective: "500px",
          background: "radial-gradient(circle, #2a2d42 0%, #0a0a12 85%)",
        }}
      >
        <img
          src="/assets/images/games/speedometer.png"
          alt="Speedometer"
          className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none"
          style={{ width: "750px", zIndex: 20 }}
        />
        <div
          className="absolute bg-arcade-red-dark border-2 border-arcade-red rounded p-4 text-white"
          style={{
            width: "18rem",
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) translateZ(${z}px) translateX(${x}px) scale(${scale})`,
            opacity,
            zIndex: 10,
          }}
        >
          <h3 className="font-pixel text-white mb-1 text-sm">
            {current.role_title}
          </h3>
          <p className="font-hud text-gray-300 text-xs mb-1">
            {current.organization}
          </p>
          <p className="font-hud text-xs">{current.description}</p>
        </div>
      </div>
    </section>
  );
}
