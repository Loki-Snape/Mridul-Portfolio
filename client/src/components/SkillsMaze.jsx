import React from "react";

const categoryColors = {
  frontend: "bg-sonic-blue",
  backend: "bg-arcade-red",
  database: "bg-sega-gold text-crt-black",
};

export default function SkillsMaze({ skills }) {
  return (
    <section className="py-8 px-4">
      <h2 className="font-pixel text-sega-gold text-center text-2xl mb-4">Skills</h2>
      <div className="relative flex justify-center mb-4 h-10">
        <div className="pacman-sprite"></div>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {skills.map(skill => {
          const bgClass = categoryColors[skill.category] || "bg-gray-600";
          return (
            <div
              key={skill.id}
              className={`${bgClass} text-crt-black font-code text-xs rounded-full px-2 py-1 transform transition-transform hover:scale-110`}
            >
              {skill.name}
            </div>
          );
        })}
      </div>
    </section>
  );
}
