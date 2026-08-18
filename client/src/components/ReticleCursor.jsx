import React, { useState, useEffect } from 'react';

const ReticleCursor = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const style = {
    position: 'fixed',
    left: mouseX - 16,
    top: mouseY - 16,
    pointerEvents: 'none',
    zIndex: 10000,
  };

  return (
    <img
      src="/assets/images/arcade/reticle-red.png"
      alt="reticle"
      className="w-8 h-8"
      style={style}
    />
  );
};

export default ReticleCursor;
