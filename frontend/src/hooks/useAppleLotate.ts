import { useState, useEffect } from 'react';

export function useAppleLotate(active: boolean) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (!active) return;
    const handleMove = (x: number) => {
      const w = window.innerWidth;
      const frame = Math.round((x / w) * 49);
      setFrame(Math.max(0, Math.min(49, frame)));
    };
    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        console.log('touchmove', e.touches[0].clientX);
        handleMove(e.touches[0].clientX);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [active]);
  return frame;
} 