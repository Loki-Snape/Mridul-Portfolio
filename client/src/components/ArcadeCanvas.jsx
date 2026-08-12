import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';


const ArcadeCanvas = () => {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, pointerEvents: 'auto', zIndex: 0 }}

    >
      {/* Lights */}
      <ambientLight intensity={0.2} />
      <pointLight color="#0055FF" position={[0, 5, 5]} intensity={0.8} />

      {/* Simple cabinet placeholder */}
      <RoundedBox args={[2, 3, 1, 0.2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0055FF" metalness={0.6} roughness={0.3} />
      </RoundedBox>

      {/* Controls */}
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />


    </Canvas>
  );
};

export default ArcadeCanvas;
