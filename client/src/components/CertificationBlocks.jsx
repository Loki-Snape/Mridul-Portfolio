import React, { useState, useEffect, useRef } from "react";

export default function CertificationBlocks({ certifications }) {
  const total = certifications.length;
  const columns = Math.min(total, 8);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState("approach");
  const [marioLeftPx, setMarioLeftPx] = useState(0);
  const [instantJump, setInstantJump] = useState(false);
  const timerRef = useRef(null);
  const blockRefs = useRef([]);
  const [blockCenters, setBlockCenters] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (total === 0) return;
    if (phase === "approach") {
      setInstantJump(false);
      setMarioLeftPx(blockCenters[currentIndex] || 0);
      timerRef.current = setTimeout(() => setPhase("jump"), 500);
    } else if (phase === "jump") {
      timerRef.current = setTimeout(() => setPhase("showing"), 400);
    } else if (phase === "showing") {
      timerRef.current = setTimeout(() => {
        if (currentIndex === total - 1) {
          setPhase("exit-right");
        } else {
          setCurrentIndex((i) => i + 1);
          setPhase("approach");
        }
      }, 6000);
    } else if (phase === "exit-right") {
      setInstantJump(false);
      setMarioLeftPx(containerRef.current?.offsetWidth + 50);
      timerRef.current = setTimeout(() => {
        setInstantJump(true);
        setMarioLeftPx(-50);
        setCurrentIndex(0);
        setPhase("enter-left");
      }, 500);
    } else if (phase === "enter-left") {
      timerRef.current = setTimeout(() => {
        setInstantJump(false);
        setPhase("approach");
      }, 50);
    }
    return () => clearTimeout(timerRef.current);
  }, [phase, currentIndex, total, blockCenters]);

  // Measure block positions and update on resize
  useEffect(() => {
    const measure = () => {
      const centers = blockRefs.current.map((el) =>
        el ? el.offsetLeft + el.offsetWidth / 2 : 0
      );
      setBlockCenters(centers);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [certifications]);

  const isJumping = phase === "jump";
  const activeCert = phase === "showing" ? certifications[currentIndex] : null;

  return (
    <section className="py-8 px-4">
      <h2 className="font-pixel text-sega-gold text-center text-2xl mb-6">
        Certifications &amp; Awards
      </h2>

      <div
        ref={containerRef}
        className="relative max-w-4xl mx-auto"
        style={{ height: "420px" }}
      >
        <div
          className={`absolute left-0 right-0 mx-auto max-w-md bg-sonic-blue-dark border border-sonic-blue rounded p-4 font-hud text-sm text-white transition-opacity duration-500 ${activeCert ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          style={{ top: "0px", minHeight: "160px" }}
        >
          {activeCert && (
            <>
              <h3 className="font-pixel text-sega-gold text-base mb-2">{activeCert.title}</h3>
              <p className="mb-1"><strong>Issuer:</strong> {activeCert.issuer}</p>
              <p><strong>Description:</strong> {activeCert.description}</p>
              <p className="mt-1">
                <strong>Completed:</strong>{" "}
                {activeCert.date_earned
                  ? new Date(activeCert.date_earned).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : ""}
              </p>
            </>
          )}
        </div>

        <div className="absolute left-0 right-0 flex justify-center gap-8 flex-wrap" style={{ top: "220px" }}>
          {certifications.map((cert, idx) => (
            <div
              ref={(el) => (blockRefs.current[idx] = el)}
              key={cert.id}
              className={`w-14 h-14 bg-cover bg-center transition-transform ${phase === "jump" && idx === currentIndex ? "scale-90" : ""}`}
              style={{ backgroundImage: "url(/assets/images/games/question-block.jpg)" }}
            />
          ))}
        </div>

        <div
          className="absolute pointer-events-none"
          style={{
            width: "48px",
            height: "48px",
            left: `${marioLeftPx}px`,
            top: isJumping ? "230px" : "320px",
            transform: "translateX(-50%)",
            zIndex: 10,
            backgroundImage: isJumping
              ? "url(/assets/images/games/mario-jump.png)"
              : "url(/assets/images/games/mario-idle.png)",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transition: instantJump ? "none" : "left 0.5s ease, top 0.5s ease",
          }}
        />
      </div>
    </section>
  );
}
