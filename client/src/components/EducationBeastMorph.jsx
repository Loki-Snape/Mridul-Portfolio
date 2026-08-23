import React, { useState, useEffect } from "react";

// Education data with display labels
const EDUCATION = [
  {
    id: "10th",
    shortLabel: "10th",
    tier: "MATRICULATION",
    school: "DAV Public School, Begusarai",
    course: "High School",
    years: "2019 - 2021",
    score: "92%",
    beastImg: "/assets/images/games/beast-fox.png",
  },
  {
    id: "12th",
    shortLabel: "12th",
    tier: "INTERMEDIATE",
    school: "Mahatma Gandhi Sikshan Sansthan, Darbhanga",
    course: "Science (PCM)",
    years: "2021 - 2023",
    score: "76.4%",
    beastImg: "/assets/images/games/beast-wolf.png",
  },
  {
    id: "btech",
    shortLabel: "B.Tech",
    tier: "GRADUATION",
    school: "VIT Bhopal University",
    course: "B.Tech in Computer Science and Engineering",
    years: "2023 - 2027",
    score: "GPA 8.96",
    beastImg: "/assets/images/games/beast-lion.png",
  },
];

export default function EducationBeastMorph() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [countdown, setCountdown] = useState(10);
  const [flashing, setFlashing] = useState(false);
  const [manualOverride, setManualOverride] = useState(false);

  // Auto‑advance logic (paused when manualOverride is true)
  useEffect(() => {
    if (manualOverride) return;
    if (countdown <= 0) {
      setFlashing(true);
      const t = setTimeout(() => {
        setFlashing(false);
        setActiveIndex((i) => (i + 1) % EDUCATION.length);
        setCountdown(10);
      }, 400);
      return () => clearTimeout(t);
    }
    const interval = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(interval);
  }, [countdown, manualOverride]);

  // Reset manualOverride after 10 s of inactivity
  useEffect(() => {
    if (!manualOverride) return;
    const timer = setTimeout(() => setManualOverride(false), 10000);
    return () => clearTimeout(timer);
  }, [manualOverride]);

  const handleButtonClick = (idx) => {
    setActiveIndex(idx);
    setCountdown(10);
    setManualOverride(true);
  };

  const current = EDUCATION[activeIndex];
  const blockShadow = { textShadow: "2px 2px 0 #000, 4px 4px 0 rgba(0,0,0,0.5)" };

  return (
    <section className="py-8 px-4">
      {/* Section heading – Sega Gold, Press Start 2P */}
      <h2
        className="text-center text-2xl mb-6"
        style={{
          color: "#FFD700",
          fontFamily: "'Press Start 2P', cursive",
        }}
      >
        Education
      </h2>

      {/* Card container – solid CRT black, bright‑red border, sharp corners */}
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#080810",
          border: "2px solid #FF0033",
        }}
        className="relative p-4"
      >
        {/* Flash overlay */}
        {flashing && (
          <img
            src="/assets/images/games/beast-morph-flash.png"
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 30,
            }}
          />
        )}

        {/* Top line – school name & PRESS START */}
        <div className="flex justify-between items-start mb-2">
          <h3
            className="text-base leading-tight max-w-[70%]"
            style={{
              color: "#FFD700",
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "1.7rem",
              fontWeight: "bold",
              textShadow:
                "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 3px 3px 0 rgba(0,0,0,0.6)",
              ...blockShadow,
            }}
          >
            {current.school}
          </h3>
          <span
            style={{
              color: "#FFD700",
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "0.85rem",
            }}
          >
            PRESS START
          </span>
        </div>

        {/* Tier label – magenta/pink glow */}
        <p
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "1.3rem",
            color: "#F0F0F5",
            fontWeight: "bold",
            letterSpacing: "0.1em",
            textShadow:
              "2px 2px 0 #FF1493, -2px -2px 0 #FF1493, 2px -2px 0 #FF1493, -2px 2px 0 #FF1493, 0 0 8px rgba(255,20,147,0.5)",
            textAlign: "center",
            ...blockShadow,
          }}
        >
          {current.tier}
        </p>

        {/* Countdown – large gold with hard black outline */}
        <p
          style={{
            color: "#FFD700",
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "4rem",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            textShadow:
              "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
            ...blockShadow,
          }}
        >
          {countdown}
        </p>

        {/* Beast image */}
        <div className="flex items-center justify-center gap-6 mb-3">
          <span
            style={{
              color: "#FFD700",
              fontSize: "1.8rem",
            }}
          >
            &#8249;
          </span>
          <img
            src={current.beastImg}
            alt=""
            style={{
              height: "224px",
              objectFit: "contain",
            }}
          />
          <span
            style={{
              color: "#FFD700",
              fontSize: "1.8rem",
            }}
          >
            &#8250;
          </span>
        </div>

        {/* Course / years / score block */}
        <div className="text-center mb-4">
          <p
            style={{
              color: "#FFFFFF",
              fontFamily: "'VT323', monospace",
              fontSize: "1.15rem",
              ...blockShadow,
            }}
          >
            {current.course}
          </p>
          <p
            style={{
              color: "#CCCCCC",
              fontFamily: "'VT323', monospace",
              fontSize: "0.95rem",
              marginBottom: "0.25rem",
              ...blockShadow,
            }}
          >
            {current.years}
          </p>
          <p
            style={{
              color: "#FFD700",
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "1.8rem",
              fontWeight: "bold",
              ...blockShadow,
            }}
          >
            {current.score}
          </p>
        </div>

        {/* Tier selector buttons – square blocks */}
        <div className="flex justify-center gap-4">
          {EDUCATION.map((edu, idx) => (
            <div
              key={edu.id}
              onClick={() => handleButtonClick(idx)}
              style={{
                width: "100px",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "2px solid",
                borderColor: idx === activeIndex ? "#FF0033" : "#333333",
                backgroundColor: idx === activeIndex ? "#FF0033" : "#080810",
                ...blockShadow,
              }}
            >
              <span
                style={{
                  color: "#FFFFFF",
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: "1.15rem",
                  fontWeight: "bold",
                }}
              >
                {edu.shortLabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
