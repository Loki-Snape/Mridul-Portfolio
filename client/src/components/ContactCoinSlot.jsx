import React, { useState } from 'react';

export default function ContactCoinSlot() {
  const [unlocked, setUnlocked] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [coinVisible, setCoinVisible] = useState(true);
  const [showFinish, setShowFinish] = useState(false);

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

  const triggerInsert = () => {
    if (animating || unlocked) return;
    setAnimating(true);
    setTimeout(() => {
      setCoinVisible(false);
      setUnlocked(true);
      setAnimating(false);
    }, 500);
  };

  const onSubmit = (e) => {
    handleSubmit(e);
    setShowFinish(true);
    setTimeout(() => setShowFinish(false), 1800);
  };

  return (
    <section className="relative flex flex-col items-center py-8 px-4">
      <h2 className="font-pixel text-2xl text-sega-gold mb-4">Contact Me</h2>

      {/* Cabinet wrapper: the <img> itself sets the real aspect ratio, so
          everything else positioned as % of THIS div lines up exactly with
          the rendered artwork — no letterboxing, no guessed dimensions. */}
      <div className="relative w-full max-w-3xl mx-auto">
        <img
          src="/assets/images/arcade/arcade-cabinet-frame.png"
          alt=""
          className="w-full h-auto block pointer-events-none select-none"
        />

        {/* Coin slot */}
        <img
          src="/assets/images/games/coin-slot-frame.png"
          alt="Coin slot"
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            top: '9%',
            width: '11%',
            transform: 'translateX(-50%)',
          }}
        />

        {/* Coin — single element, fully removed from DOM after insert */}
        {coinVisible && (
          <div
            onClick={triggerInsert}
            className="absolute cursor-pointer z-20"
            style={{
              left: '50%',
              top: '19%',
              width: '7%',
              transform: 'translateX(-50%)',
              perspective: '1000px',
            }}
          >
            <div
              style={{
                transformStyle: 'preserve-3d',
                animation: animating
                  ? 'coinInsert 0.5s forwards'
                  : 'coinSpin 3s linear infinite',
              }}
              className="w-full aspect-square relative"
            >
              <img
                src="/assets/images/games/contact-coin-front.png"
                alt=""
                className="absolute inset-0 w-full h-full"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
              />
              <img
                src="/assets/images/games/contact-coin-back.png"
                alt=""
                className="absolute inset-0 w-full h-full"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              />
            </div>
          </div>
        )}

        {/* Screen content area — matched to the black cutout in the artwork */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: '23%',
            top: '28%',
            width: '54%',
            height: '58%',
            overflowY: 'auto',
          }}
        >
          {!unlocked && (
            <h3
              className="font-pixel text-sega-gold text-center animate-pulse"
              style={{ fontSize: 'clamp(0.8rem, 2vw, 1.4rem)' }}
            >
              INSERT COIN TO CONTINUE
            </h3>
          )}

          {unlocked && (
            <form onSubmit={onSubmit} className="flex flex-col gap-2 w-full max-w-xs mt-2">
              <div>
                <label className="block font-pixel text-xs text-sega-gold mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full h-8 bg-crt-black border border-sonic-blue rounded px-2 text-white font-hud text-sm"
                />
              </div>
              <div>
                <label className="block font-pixel text-xs text-sega-gold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full h-8 bg-crt-black border border-sonic-blue rounded px-2 text-white font-hud text-sm"
                />
              </div>
              <div>
                <label className="block font-pixel text-xs text-sega-gold mb-1">Message</label>
                <textarea
                  name="message"
                  rows={2}
                  required
                  className="w-full bg-crt-black border border-sonic-blue rounded px-2 py-1 text-white font-hud text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-arcade-red hover:bg-arcade-red-dark text-white font-pixel px-3 py-1 rounded text-sm mx-auto mt-1"
              >
                TRANSMIT
              </button>
            </form>
          )}
        </div>
      </div>

      {showFinish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-red-600 via-orange-500 to-yellow-300 animate-burst" />
            <img
              src="/assets/images/games/finish-him-burst.webp"
              alt="FINISH HIM"
              className="relative w-64 h-auto animate-pulse"
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes coinSpin { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
        @keyframes coinInsert { 0% { transform: translateY(0) scale(1); opacity: 1; } 80% { transform: translateY(-15px) scale(0.5); opacity: 1; } 100% { transform: translateY(-25px) scale(0.3); opacity: 0; } }
        @keyframes burst { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.2); opacity: 0.8; } 100% { transform: scale(1.5); opacity: 0; } }
        .animate-burst { animation: burst 0.8s forwards; }
      `}</style>
    </section>
  );
}
