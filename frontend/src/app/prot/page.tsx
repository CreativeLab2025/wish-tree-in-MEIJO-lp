'use client'
import React, { useState, useEffect, useRef } from 'react';
import Title from '../../components/Title';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import Abot from '@/components/intro/abot';
import CircleExpand from '@/components/CircleExpand';
import Jogiken from '@/components/intro/jogiken';
import { useAppleLotate } from '@/hooks/useAppleLotate';
import { useSectionProgress } from '@/hooks/useSectionProgress';

export default function ProtPage() {
  // タイトルアニメーション終了状態
  const [titleAnimEnd, setTitleAnimEnd] = useState(false);
  // 画像プリロード状態
  const { loaded } = useImagePreloader();
  // refs for sections
  const titleRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const jogikenRef = useRef<HTMLDivElement>(null);

  // セクション進捗・現在セクション判定
  const { currentSection, easedProgress } = useSectionProgress(aboutRef, jogikenRef);

  // りんごの目標位置・回転・スケール
  let targetLeft: number;
  let targetRotation: number;
  let targetScale: number;
  if (currentSection === 'title') {
    targetLeft = 50;
    targetRotation = 0;
    targetScale = 1.0;
  } else if (currentSection === 'about') {
    targetLeft = 10 + 80 * easedProgress;
    targetRotation = -360 + 720 * easedProgress;
    targetScale = 2.0 + 0.8 * Math.sin(easedProgress * Math.PI);
  } else if (currentSection === 'jogiken') {
    targetLeft = 70;
    targetRotation = 360;
    targetScale = 3.0;
  } else {
    targetLeft = 50;
    targetRotation = 0;
    targetScale = 1.0;
  }

  // 現在値をlerpで追従
  const [left, setLeft] = useState(targetLeft);
  const [rotation, setRotation] = useState(targetRotation);
  const [scale, setScale] = useState(targetScale);
  useEffect(() => {
    let frame: number;
    const animate = () => {
      setLeft(prev => {
        const next = prev + (targetLeft - prev) * 0.15;
        if (Math.abs(next - targetLeft) < 0.01) return targetLeft;
        return next;
      });
      setRotation(prev => {
        const next = prev + (targetRotation - prev) * 0.15;
        if (Math.abs(next - targetRotation) < 0.5) return targetRotation;
        return next;
      });
      setScale(prev => {
        const next = prev + (targetScale - prev) * 0.15;
        if (Math.abs(next - targetScale) < 0.01) return targetScale;
        return next;
      });
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [targetLeft, targetRotation, targetScale]);

  // ポップイン・Lotate管理
  const [showPop, setShowPop] = useState(false);
  const [lotateActive, setLotateActive] = useState(false);
  useEffect(() => {
    if (titleAnimEnd && loaded) {
      setShowPop(true);
    }
  }, [titleAnimEnd, loaded]);
  const handlePopInEnd = () => {
    setShowPop(false);
    setLotateActive(true);
  };

  // Lotateフレーム
  const appleFrame = useAppleLotate(lotateActive);

  return (
    <div>
      {/* タイトルセクション */}
      <div ref={titleRef} className="flex flex-col items-center justify-center min-h-screen ">
        <div className="mb-4" style={{ minHeight: 560 }} />
        <div style={{ position: 'relative', zIndex: 10001 }}>
          <Title onAnimationEnd={() => setTitleAnimEnd(true)} disappear={currentSection === 'about'} />
        </div>
      </div>
      <div style={{ minHeight: 1200, position: 'relative' }}>
        <CircleExpand minSize={0} maxSize={1200} colorClass="bg-orange-400" />
      </div>

      {/* aboutセクション */}
      <div ref={aboutRef} className="flex flex-col justify-center min-h-screen bg-orange-400">
       <Abot /> 
      </div>

      {/* りんごを画面に固定表示し、すべての変化を滑らかに補間 */}
      {titleAnimEnd && loaded && (
        <div
          style={showPop
            ? {
                position: 'fixed',
                top: '15%',
                left: '50%',
                transform: 'translateX(-50%) scale(1.0)',
                zIndex: 10,
                pointerEvents: 'none',
              }
            : {
                position: 'fixed',
                top: '15%',
                left: `${left}%`,
                transform: `translateX(-50%) rotate(${rotation}deg) scale(${scale})`,
                zIndex: 10,
                pointerEvents: 'none',
              }
          }
        >
          {showPop ? (
            <img
              src={`/AppleLotatewebp/model_frame_0000.webp`}
              alt="Apple Pop In"
              width={560}
              height={560}
              className="pop-in-heavy"
              style={{ display: 'block', margin: '0 auto', userSelect: 'none' }}
              draggable={false}
              onAnimationEnd={handlePopInEnd}
            />
          ) : (
            <img
              src={`/AppleLotatewebp/model_frame_${appleFrame.toString().padStart(4, '0')}.webp`}
              alt="Apple Rotation"
              width={560}
              height={560}
              style={{ display: 'block', margin: '0 auto', userSelect: 'none' }}
              draggable={false}
            />
          )}
        </div>
      )}

      <div style={{ minHeight: 1200, position: 'relative', zIndex: 1}}>
        <CircleExpand minSize={0} maxSize={1200} colorClass="bg-green-400" />
      </div>
      <div ref={jogikenRef} className="flex  flex-col items-start justify-center min-h-screen bg-green-400">
        <Jogiken />
      </div>

      {/* シンプルなポップインアニメーション用style */}
      <style>{`
        @keyframes pop-in-heavy {
          0%   { transform: scale(0.5); opacity: 0; }
          60%  { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1.0); opacity: 1; }
        }
        .pop-in-heavy {
          animation: pop-in-heavy 1.0s cubic-bezier(0.5,1.7,0.6,1) both;
        }
      `}</style>
    </div>
  );
}
