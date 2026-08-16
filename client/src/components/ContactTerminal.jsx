import React from 'react';

export default function ContactTerminal() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };
    console.log('Contact form submitted:', values);
  };

  return (
    <section className="py-8 px-4">
      <h2 className="font-pixel text-sega-gold text-center text-2xl mb-4">Contact Me</h2>
      {/* Coin slot decorative */}
      <div className="bg-crt-black rounded w-48 h-12 mx-auto mb-4 flex items-center justify-center">
        <div className="bg-sega-gold w-1 h-8" />
      </div>
      <form className="flex flex-col gap-4 max-w-md mx-auto" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block font-pixel text-xs text-sega-gold mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full bg-crt-black border border-sonic-blue rounded px-3 py-2 text-white font-hud"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-pixel text-xs text-sega-gold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-crt-black border border-sonic-blue rounded px-3 py-2 text-white font-hud"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block font-pixel text-xs text-sega-gold mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full bg-crt-black border border-sonic-blue rounded px-3 py-2 text-white font-hud"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-arcade-red hover:bg-arcade-red-dark text-white font-pixel px-6 py-2 rounded transition-colors mx-auto"
        >
          TRANSMIT
        </button>
      </form>
      <div className="flex justify-center gap-4 mt-6 text-code font-code text-sonic-blue">
        <a href="mailto:himriduljha11@gmail.com" className="hover:text-sega-gold">Email</a>
        <a href="#" className="hover:text-sega-gold">GitHub</a>
        <a href="#" className="hover:text-sega-gold">LinkedIn</a>
        <a href="#" className="hover:text-sega-gold">LeetCode</a>
      </div>
    </section>
  );
}
