import React from 'react';

export default function ExperienceSection({ experience }) {
  return (
    <section className="py-8 px-4">
      <h2 className="font-pixel text-sega-gold text-center text-2xl mb-4">
        LEADERSHIP GARAGE // SELECT YOUR RIDE
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experience.map((exp) => (
          <div
            key={exp.id}
            className="bg-arcade-red-dark border-2 border-arcade-red rounded p-4 text-white"
          >
            <h3 className="font-pixel text-white mb-2">{exp.role_title}</h3>
            <p className="font-hud text-gray-300 mb-1">{exp.organization}</p>
            <p className="font-code text-xs mb-2">
              {exp.start_date} – {exp.end_date ? exp.end_date : 'PRESENT'}
            </p>
            <p className="font-hud text-sm mb-4">{exp.description}</p>
            {/* Stat bars */}
            {[
              { label: 'Speed', value: exp.stat_speed },
              { label: 'Power', value: exp.stat_power },
              { label: 'Handling', value: exp.stat_handling },
            ].map((stat) => (
              <div key={stat.label} className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-code">{stat.label}</span>
                  <span className="font-code">{stat.value}%</span>
                </div>
                <div className="bg-crt-black h-2 w-full rounded">
                  <div
                    className="bg-sega-gold h-2 rounded"
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
