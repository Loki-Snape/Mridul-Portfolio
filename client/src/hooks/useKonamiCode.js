import { useState, useEffect, useCallback } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export default function useKonamiCode() {
  const [activated, setActivated] = useState(false);
  const [progress, setProgress] = useState(0);

  const reset = useCallback(() => {
    setActivated(false);
    setProgress(0);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const key = e.key.toLowerCase();
      const expected = KONAMI_SEQUENCE[progress].toLowerCase();
      if (key === expected) {
        const next = progress + 1;
        if (next === KONAMI_SEQUENCE.length) {
          setActivated(true);
          setProgress(0);
        } else {
          setProgress(next);
        }
      } else {
        // reset if wrong key
        setProgress(0);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [progress]);

  return { activated, reset };
}
