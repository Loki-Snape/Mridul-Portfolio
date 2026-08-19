import React from 'react';

const StatBar = ({ label, value, colorClass }) => (
  <div className="mb-2">
    <div className="font-code text-sm mb-1">{label}</div>
    <div className="bg-crt-black w-full h-4 rounded overflow-hidden">
      <div
        className={`h-4 ${colorClass} rounded`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const ProjectCard = ({ project }) => {
  const {
    title,
    description,
    tech_stack = [],
    system_load,
    real_time_sync,
    tech_complexity,
    performance_score,
    stress_test_hp,
    live_url,
    repo_url,
    portrait_image,
  } = project;

  return (
    <div className="bg-sonic-blue-dark border-2 border-sonic-blue rounded p-4 hover:shadow-arcade-glow">
        {portrait_image && (
          <img src={portrait_image} alt={title} className="w-full h-40 object-cover rounded mb-3 border border-sonic-blue" />
        )}
      {/* Title */}
      <h3 className="font-pixel text-sega-gold text-xl mb-2">{title}</h3>

      {/* Description */}
      <p className="font-hud text-gray-300 text-sm mb-3">{description}</p>

      {/* Tech stack badges */}
      <div className="flex flex-wrap gap-1 mb-3">
        {tech_stack.map((tech, idx) => (
          <span
            key={idx}
            className="font-code bg-crt-black border border-sonic-blue rounded-full px-2 py-1 text-xs"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Stat bars */}
      <StatBar label="System Load" value={system_load} colorClass="bg-arcade-red" />
      <StatBar label="Real‑Time Sync" value={real_time_sync} colorClass="bg-sonic-blue" />
      <StatBar label="Tech Complexity" value={tech_complexity} colorClass="bg-sega-gold" />

      {/* Performance gauge */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full border-4 border-sonic-blue bg-crt-black text-pixel text-white mx-auto my-4">
        {performance_score}
      </div>

      {/* Stress test HP bar */}
      <StatBar label="SYSTEM INTEGRITY" value={stress_test_hp} colorClass="bg-arcade-red" />

      {/* Links */}
      <div className="mt-3 flex space-x-4 text-sm">
        {live_url &&            <a
              href={live_url}
              className="bg-crt-black border border-sonic-blue rounded px-2 py-1 hover:bg-sonic-blue hover:text-crt-black transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live
            </a>
        }
        {repo_url && (
          <a
            href={repo_url}
            className="bg-crt-black border border-sonic-blue rounded px-2 py-1 hover:bg-sonic-blue hover:text-crt-black transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Repo
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
