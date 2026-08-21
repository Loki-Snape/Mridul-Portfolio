import React from "react";

export default function AboutSection() {
  return (
    <div className="text-center px-4">
      <h2 className="font-pixel text-sega-gold text-2xl mb-4">About</h2>
      <p className="font-hud text-gray-300 max-w-2xl mx-auto mb-3">
        I am a Computer Science undergraduate at VIT Bhopal University
        (8.96 CGPA) specializing in full-stack web applications,
        real-time backend architecture, and strategy game systems.
      </p>
      <p className="font-hud text-gray-300 max-w-2xl mx-auto mb-3">
        My technical work focuses on building robust systems, ranging
        from server-authoritative multiplayer match engines using
        Socket.io and PostgreSQL to transactional workflows with ACID
        compliance and background job processing.
      </p>
      <p className="font-hud text-gray-300 max-w-2xl mx-auto">
        Parallel to my engineering work, I am an award-winning writer.
        I leverage strong narrative skills to write clear
        documentation, frame product vision, and build engaging user
        experiences.
      </p>
    </div>
  );
}
