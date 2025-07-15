import React, { useRef, useEffect, useState } from 'react';

interface CircleExpandProps {
  colorClass?: string; // e.g. 'bg-orange-400'
  minSize?: number; // px
  maxSize?: number; // px
  expandDistance?: number; // どれぐらいのyで最大化するか(px)
  style?: React.CSSProperties;
  onProgressChange?: (progress: number) => void; // 追加
}

// 緩やかな補間関数
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const CircleExpand: React.FC<CircleExpandProps> = ({
  colorClass = 'bg-orange-400',
  minSize = 0,
  maxSize = 2000,
  expandDistance,
  style = {},
  onProgressChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0: not expanded, 1: fully expanded
  const [inView, setInView] = useState(false);
  const targetProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const elem = containerRef.current;
      if (!elem) return;
      const rect = elem.getBoundingClientRect();
      const windowH = window.innerHeight;
      // セクションの手前expandDistance分だけで拡大
      const expand = expandDistance ?? 400; // デフォルト400px
      const distance = windowH - rect.top;
      const p = Math.min(1, Math.max(0, distance / expand));
      targetProgress.current = p;
      setProgress(p); // y軸に即時追従
      setInView(rect.bottom > 0 && rect.top < windowH);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [maxSize, expandDistance]);

  // progressが変化したらコールバック
  useEffect(() => {
    if (onProgressChange) onProgressChange(progress);
  }, [progress, onProgressChange]);

  // progress <= 0 なら何も描画しない
  //if (progress <= 0) return null;

  // Circle size based on progress
  const size = minSize + (maxSize - minSize) * Math.min(progress, 1);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        ...style,
      }}
    >
      {/* Expanding circle: only show while in view and progress < 1 */}
      {inView && (
        <div
          className={colorClass}
          style={{
            position: 'fixed',
            left: '50%',
            bottom: 0,
            transform: `translateX(-50%)`,
            width: size,
            height: size,
            borderRadius: '50%',
            zIndex: -1, // ここを最小に
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        />
      )}
      {/* Full background overlay when fully expanded */}
      {progress >= 1 && (
        <div
          className={colorClass}
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1, // ここも最小に
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};

export default CircleExpand; 