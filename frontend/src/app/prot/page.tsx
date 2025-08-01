'use client'
import React, { useState, useEffect, useRef } from 'react';
import Title from '../../components/Title';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import Abot from '@/components/intro/abot';
import CircleExpand from '@/components/CircleExpand';
import Jogiken from '@/components/intro/jogiken';
import Ideatech from '@/components/intro/ideatech';
import { useAppleLotate } from '@/hooks/useAppleLotate';
import { useSectionProgress } from '@/hooks/useSectionProgress';
import { getImagePath } from '@/utils/imageUtils';

export default function ProtPage() {
  // ページリロード時に一番上にスクロール
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // タイトルアニメーション終了状態
  const [titleAnimEnd, setTitleAnimEnd] = useState(false);
  // 画像プリロード状態
  const { loaded } = useImagePreloader();
  // refs for sections
  const titleRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const jogikenRef = useRef<HTMLDivElement>(null);
  const ideatechRef = useRef<HTMLDivElement>(null);
  // セクション進捗・現在セクション判定
  const { currentSection, easedProgress } = useSectionProgress(aboutRef, jogikenRef, ideatechRef);

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
    targetLeft =  80 * easedProgress;
    targetRotation = 360 * easedProgress;
    targetScale = 3.0 + 0.8 * Math.sin(easedProgress * Math.PI);
  } else if (currentSection === 'ideatech') {
    targetLeft = 20 * easedProgress;
    targetRotation = 0;
    targetScale = 4.0 + 0.8 * Math.sin(easedProgress * Math.PI);
  } else {
    targetLeft = 50;
    targetRotation = -360 + 720 * easedProgress;
    targetScale = 5.0;
  }

  // 現在値をlerpで追従
  const [left, setLeft] = useState(50);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1.0);
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
  }, [targetLeft, targetRotation, targetScale, currentSection, easedProgress]);

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
    <>
      {/* タイトルセクション */}
      <div ref={titleRef} className="flex flex-col items-center justify-center min-h-screen pt-8 md:pt-24">
        <div className="mb-2 md:mb-4" style={{ minHeight: 120 }} />
        <div style={{ position: 'relative', zIndex: 10001 }}>
          <Title onAnimationEnd={() => setTitleAnimEnd(true)} disappear={currentSection === 'about'} />
        </div>
        <div style={{ minHeight: 120, position: 'relative' }}></div>
      </div>
      <div ref={aboutRef}>
      <div style={{ minHeight: 1200, position: 'relative' }}>
        <CircleExpand minSize={0} maxSize={1200} colorClass="bg-orange-400" />
      </div>

      {/* aboutセクション */}
      <div  className="flex flex-col justify-center min-h-screen bg-orange-400">
       <Abot /> 
      </div>
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
                // transformはimgのstyleで適用する
                zIndex: 10,
                pointerEvents: 'none',
              }
          }
        >
          {showPop ? (
            <img
              src={getImagePath(0)}
              alt="Apple Pop In"
              className="pop-in-heavy w-[95vw] max-w-[700px] h-auto md:w-[560px] md:max-w-[560px]"
              style={{ display: 'block', margin: '0 auto', userSelect: 'none' }}
              draggable={false}
              onAnimationEnd={handlePopInEnd}
            />
          ) : (
            <img
              src={getImagePath(appleFrame)}
              alt="Apple Rotation"
              className="w-[95vw] max-w-[700px] h-auto md:w-[560px] md:max-w-[560px]"
              style={{
                display: 'block',
                margin: '0 auto',
                userSelect: 'none',
                transform: `translateX(-50%) rotate(${rotation}deg) scale(${scale})`,
                transition: 'transform 0.2s cubic-bezier(0.23,1,0.32,1)'
              }}
              draggable={false}
            />
          )}
        </div>
      )}
      <div ref={jogikenRef}>
        <div  style={{ minHeight: 1200, position: 'relative', zIndex: 1}}>
          <CircleExpand minSize={0} maxSize={1200} colorClass="bg-green-400" />
        </div>
        <div  className="flex  flex-col items-start justify-center min-h-screen bg-green-400">
          <Ideatech />
        </div>
      </div>
      <div ref={ideatechRef}>
        <div  style={{ minHeight: 1200, position: 'relative', zIndex: 1}}>
          <CircleExpand minSize={0} maxSize={1200} colorClass="bg-[#F7F1E8]" />
        </div>
        <div  className="flex  flex-col items-end justify-center min-h-screen bg-[#F7F1E8]">
          <Jogiken />
        </div>
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
    </>
  );
}
