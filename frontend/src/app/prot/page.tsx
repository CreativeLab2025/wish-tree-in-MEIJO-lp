'use client'
import React, { useState, useEffect, useRef } from 'react';
import Title from '../../components/Title';
import AppleRotation from '../../components/AppleRotation';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import Abot from '@/components/intro/abot';
import CircleExpand from '@/components/CircleExpand';
import Jogiken from '@/components/intro/jogiken';

export default function ProtPage() {
  // タイトルアニメーション終了状態
  const [titleAnimEnd, setTitleAnimEnd] = useState(false);
  // 画像プリロード状態
  const { loaded } = useImagePreloader();
  // 現在どのセクションにいるか
  const [currentSection, setCurrentSection] = useState<'title' | 'about' | 'jogiken'>('title');

  // 各セクションのref
  const titleRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const jogikenRef = useRef<HTMLDivElement>(null);

  // スクロールで現在のセクションを判定
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const aboutTop = aboutRef.current?.offsetTop ?? 0;
      const aboutHeight = aboutRef.current?.offsetHeight ?? 0;
      const jogikenTop = jogikenRef.current?.offsetTop ?? 0;
      const jogikenHeight = jogikenRef.current?.offsetHeight ?? 0;
      if (scrollY >= jogikenTop - 100 && scrollY < jogikenTop + jogikenHeight - 100) {
        setCurrentSection('jogiken');
      } else if (scrollY >= aboutTop - 100 && scrollY < aboutTop + aboutHeight - 100) {
        setCurrentSection('about');
      } else {
        setCurrentSection('title');
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // セクションごとの目標位置・回転角（古い定義）は削除
  // const sectionToPosition: Record<string, number> = { ... }
  // const targetPos = sectionToPosition[currentSection] ?? 0.5;
  // const sectionToRotation: Record<string, number> = { ... }
  // const targetRotation = sectionToRotation[currentSection] ?? 0;

  // バウンド感のあるeaseOutBackイージング関数
  function easeOutBack(x: number): number {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }
  // イージング関数（滑らかさ重視）
  function easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }
  // 現在のりんご位置（0.0～1.0）
  // const [applePos, setApplePos] = useState(0.5);
  // useEffect(() => {
  //   let start = applePos;
  //   let end = targetLeft;
  //   let startTime: number | null = null;
  //   const duration = 900; // ms
  //   function animate(ts: number) {
  //     if (!startTime) startTime = ts;
  //     const t = Math.min(1, (ts - startTime) / duration);
  //     const eased = easeOutBack(t);
  //     setApplePos(start + (end - start) * eased);
  //     if (t < 1) requestAnimationFrame(animate);
  //   }
  //   requestAnimationFrame(animate);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [targetLeft]);

  // 現在のりんご回転角
  // const [appleRotation, setAppleRotation] = useState(0);
  // useEffect(() => {
  //   let start = appleRotation;
  //   let end = targetRotation;
  //   let startTime: number | null = null;
  //   const duration = 900;
  //   function animate(ts: number) {
  //     if (!startTime) startTime = ts;
  //     const t = Math.min(1, (ts - startTime) / duration);
  //     const eased = easeOutBack(t);
  //     setAppleRotation(start + (end - start) * eased);
  //     if (t < 1) requestAnimationFrame(animate);
  //   }
  //   requestAnimationFrame(animate);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [targetRotation]);

  // スクロール進捗（about～jogiken間: 0→1）
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const aboutRect = aboutRef.current?.getBoundingClientRect();
      const jogikenRect = jogikenRef.current?.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (aboutRect && jogikenRect) {
        const aboutBottom = aboutRect.bottom;
        const jogikenTop = jogikenRect.top;
        const range = jogikenTop - aboutBottom;
        const centerY = windowH / 2;
        let t = 0;
        if (centerY > aboutBottom && centerY < jogikenTop && range > 0) {
          t = (centerY - aboutBottom) / range;
        } else if (centerY <= aboutBottom) {
          t = 0;
        } else if (centerY >= jogikenTop) {
          t = 1;
        }
        setScrollProgress(t);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // イージングをかけた進捗
  const easedProgress = easeInOutCubic(scrollProgress);

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
    targetScale = 1.0 + 0.8 * Math.sin(easedProgress * Math.PI); // about区間でさらに大きく
  } else if (currentSection === 'jogiken') {
    targetLeft = 90;
    targetRotation = 360;
    targetScale = 1.0;
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

  // about/jogikenで自動回転
  const appleAutoRotate = currentSection !== 'title';

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
          style={{
            position: 'fixed',
            top: '15%',
            left: `calc(${left}% - 280px)`,
            zIndex: 10,
            pointerEvents: 'none',
            transform: `rotate(${rotation}deg) scale(${scale})`,
          }}
        >
          <AppleRotation
            autoRotate={appleAutoRotate}
            size="custom"
            fruitType="apple"
            frameCount={50}
            className="w-[560px] h-[560px]"
            style={{ transformOrigin: 'center center' }}
            zIndex={1000}
          />
        </div>
      )}

      <div style={{ minHeight: 1200, position: 'relative', zIndex: 1}}>
        <CircleExpand minSize={0} maxSize={1200} colorClass="bg-blue-400" />
      </div>
      <div ref={jogikenRef} className="flex  flex-col items-start justify-center min-h-screen bg-blue-400">
        <Jogiken />
      </div>

    </div>
  );
}
