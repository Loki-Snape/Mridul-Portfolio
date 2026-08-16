import React, { useState } from 'react';

export default function CertificationBlocks({ certifications }) {
  const [openedId, setOpenedId] = useState(null);

  const toggleOpen = (id) => {
    setOpenedId(prev => (prev === id ? null : id));
  };

  const openedCert = certifications.find(c => c.id === openedId);

  return (
    <section className="py-8 px-4">
      <h2 className="font-pixel text-sega-gold text-center text-2xl mb-4">Certifications & Awards</h2>
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {certifications.map(cert => (
          <button
            key={cert.id}
            onClick={() => toggleOpen(cert.id)}
            className="w-16 h-16 bg-sega-gold-dark border-2 border-sega-gold flex items-center justify-center text-crt-black font-pixel text-2xl hover:-translate-y-1 transform transition"
          >
            ?
          </button>
        ))}
      </div>
      {openedCert && (
        <div className="mx-auto max-w-md bg-sonic-blue-dark border border-sonic-blue rounded p-4 font-hud text-sm text-white">
          <h3 className="font-pixel text-sega-gold text-lg mb-2">{openedCert.title}</h3>
          <p className="mb-1"><strong>Issuer:</strong> {openedCert.issuer}</p>
          <p className="mb-1"><strong>Description:</strong> {openedCert.description}</p>
          <p className="mb-1"><strong>Date Earned:</strong> {openedCert.date_earned}</p>
          {openedCert.credential_url && (
            <a href={openedCert.credential_url} target="_blank" rel="noopener noreferrer" className="text-crt-black underline">
              View Credential
            </a>
          )}
        </div>
      )}
    </section>
  );
}
