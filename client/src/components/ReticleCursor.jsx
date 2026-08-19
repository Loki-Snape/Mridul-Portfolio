import React, { useState, useEffect } from "react";

export default function ReticleCursor() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const style = {
    position: "fixed",
    left: mouseX - 40,
    top: mouseY - 40,
    pointerEvents: "none",
    zIndex: 10000,
  };

  return (
    <img
      src="/assets/images/arcade/reticle-red.png"
      alt="reticle"
      className="w-20 h-20"
      style={style}
    />
  );
}
