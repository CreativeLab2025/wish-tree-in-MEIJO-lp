import { useState, useEffect } from 'react';

export function useAppleLotate(active: boolean) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (!active) return;
    const handleMove = (e: MouseEvent) => {
      const x = e.clientX;
      const w = window.innerWidth;
      const frame = Math.round((x / w) * 49);
      setFrame(Math.max(0, Math.min(49, frame)));
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [active]);
  return frame;
} 