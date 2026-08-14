import React, { useState, useEffect } from 'react';
import ArcadeCanvas from './components/ArcadeCanvas';
import ProjectCard from './components/ProjectCard';
import SkillsMaze from './components/SkillsMaze';
import CertificationBlocks from './components/CertificationBlocks';
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
        {/* Project grid */}
        <section className="py-8 px-4">
          <h2 className="font-pixel text-sega-gold text-center text-2xl mb-6">
            MISSION HOLODEQ // SELECT YOUR OPERATIVE
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          </section>

          {/* Skills Maze */}
          <SkillsMaze skills={skills} />

          {/* Certification Blocks */}
          <CertificationBlocks certifications={certifications} />
      </div>
    </>
  );
}

export default App;
