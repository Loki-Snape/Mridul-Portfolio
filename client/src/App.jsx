import React, { useState, useEffect } from 'react';
import ArcadeCanvas from './components/ArcadeCanvas';
import { getProjects, getSkills, getCertifications, getExperience } from './services/api';
import './index.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    getProjects().then(setProjects);
    getSkills().then(setSkills);
    getCertifications().then(setCertifications);
    getExperience().then(setExperience);
  }, []);

  return (
    <>
      {/* 3D background canvas */}
      <ArcadeCanvas />

      {/* Main UI layer */}
      <div className="min-h-screen bg-crt-black text-white reticle-cursor relative" style={{ position: 'relative', zIndex: 1 }}>
        <div className="crt-overlay" />
        <div className="crt-vignette" />
        <h1 className="font-pixel text-sega-gold text-2xl p-8">
          SEGA HYPER-ARCADE '96 // LOADING...
        </h1>
        {/* Debug info */}
        <div className="p-4 text-sm">
          <p>Projects loaded: {projects.length}</p>
          {projects.map((p, i) => (
            <p key={i}>- {p.title}</p>
          ))}
          <p>Skills loaded: {skills.length}</p>
          <p>Certifications loaded: {certifications.length}</p>
          <p>Experience entries loaded: {experience.length}</p>
        </div>
      </div>
    </>
  );
}

export default App;
