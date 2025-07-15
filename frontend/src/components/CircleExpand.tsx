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

  // より滑らかに
  useEffect(() => {
    let running = true;
    function animate() {
      setProgress(prev => {
        const next = lerp(prev, targetProgress.current, 0.01); // よりゆっくり・滑らか
        return Math.abs(next - targetProgress.current) < 0.0002 ? targetProgress.current : next;
      });
      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => { running = false; };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const elem = containerRef.current;
      if (!elem) return;
      const rect = elem.getBoundingClientRect();
      const windowH = window.innerHeight;
      // y軸での距離を取得（ウィンドウ下端から要素上端までの距離）
      const y = windowH - rect.top;
      // y=0 で progress=0, y=maxY で progress=1
      const maxY = expandDistance ?? maxSize; // 親から指定なければmaxSize
      const p = Math.min(1, Math.max(0, y / maxY));
      targetProgress.current = p;
      // inViewもy軸で判定
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

  // progressが1以上なら何も描画しない
  if (progress >= 1) return null;

  // Circle size based on progress
  const size = minSize + (maxSize - minSize) * progress;

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', ...style }}>
      {/* Expanding circle: only show while in view and not fully expanded */}
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
            zIndex: -1,
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        />
      )}
    </div>
  );
};

export default CircleExpand; 