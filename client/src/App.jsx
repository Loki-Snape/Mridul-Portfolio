import React, { useState, useEffect } from 'react';
import ArcadeCanvas from './components/ArcadeCanvas';
import ProjectCard from './components/ProjectCard';
import SkillsMaze from './components/SkillsMaze';
import CertificationBlocks from './components/CertificationBlocks';
import ExperienceRoadRash from './components/ExperienceRoadRash';
import ContactCoinSlot from './components/ContactCoinSlot';
import useKonamiCode from './hooks/useKonamiCode';
import AboutSection from './components/AboutSection';
import TetrisAboutReveal from './components/TetrisAboutReveal';
import EducationBeastMorph from './components/EducationBeastMorph';
import GalaxianSocials from './components/GalaxianSocials';
import LeaderboardSection from './components/LeaderboardSection';
import GlobalEasterEggs from './components/GlobalEasterEggs';
import KonamiTerminal from './components/KonamiTerminal';

import { getProjects, getSkills, getCertifications, getExperience } from './services/api';
import './index.css';
import ReticleCursor from './components/ReticleCursor';

function App() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [experience, setExperience] = useState([]);
  const { activated, reset } = useKonamiCode();


  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') reset(); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [reset]);
  useEffect(() => {
    getProjects().then(setProjects);
    getSkills().then(setSkills);
    getCertifications().then(setCertifications);
    getExperience().then(setExperience);
  }, []);

  return (
    <>
      <ReticleCursor />
      <GlobalEasterEggs />
      {/* 3D background canvas */}
      <ArcadeCanvas />

      {/* Main UI layer */}
      <div id="app-main-ui-layer" className="min-h-screen bg-crt-black text-white reticle-cursor relative transition-all duration-[1800ms] ease-in-out" style={{ position: 'relative', zIndex: 1 }}>
        <div className="crt-overlay" />
        <div className="crt-vignette" />
        <div className="flex items-center space-x-4 p-8">
          <img src="/assets/images/profile-photo.jpg" alt="Profile" className="w-32 h-32 rounded-full border-4 border-sega-gold object-cover" />
          <div>
            <img src="/assets/images/arcade/sega-font-logo.png" alt="Mridul Jha" className="h-28 w-auto" />
            <p className="font-hud text-gray-300 text-lg">Full-Stack Real-Time Systems & Game Engine Engineer</p>
          </div>
        </div>

        <TetrisAboutReveal>

          <AboutSection />
        </TetrisAboutReveal>
        <section className="py-8 px-4 overflow-hidden">
          <h2 className="font-pixel text-sega-gold text-center text-2xl mb-6">
            Projects
          </h2>
          <div className="flex marquee-track" style={{ width: 'fit-content', animation: 'marquee-scroll 40s linear infinite' }}>
            {[...projects, ...projects].map((project, idx) => (
              <div key={`${project.id}-${idx}`}
                className="flex-shrink-0 w-[75vw] sm:w-[380px] p-2">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </section>


        {/* Skills Maze */}
        <SkillsMaze skills={skills} />

        {/* Certification Blocks */}
        <CertificationBlocks certifications={certifications} />

        {/* Leaderboard Section */}
        <LeaderboardSection />

        {/* Experience Section */}
        <ExperienceRoadRash experience={experience} />
        {/* Education Beast Morph */}
        <EducationBeastMorph />
        {/* Galaxian Socials */}
        <GalaxianSocials />
        {/* Contact Terminal */}
        <ContactCoinSlot />

        {/* Konami Code Overlay */}
        {activated && <KonamiTerminal activated={activated} onClose={reset} />}
      </div>
    </>
  );
}

export default App;
