'use client'
import React, { useState, useEffect, useRef } from 'react';
import Title from '../../components/Title';
import AppleRotation from '../../components/AppleRotation';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import Abot from '@/components/abot';
import CircleExpand from '@/components/CircleExpand';

export default function ProtPage() {
  // タイトルアニメーション終了状態
  const [titleAnimEnd, setTitleAnimEnd] = useState(false);
  // 画像プリロード状態
  const { loaded } = useImagePreloader();
  // 現在どのセクションにいるか
  const [currentSection, setCurrentSection] = useState<'title' | 'about'>('title');

  // 各セクションのref
  const titleRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // スクロールで現在のセクションを判定
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const aboutTop = aboutRef.current?.offsetTop ?? 0;
      const aboutHeight = aboutRef.current?.offsetHeight ?? 0;
      // aboutセクションの範囲にいるか
      if (scrollY >= aboutTop - 100 && scrollY < aboutTop + aboutHeight - 100) {
        setCurrentSection('about');
      } else {
        setCurrentSection('title');
      }
    };
    window.addEventListener('scroll', onScroll);
    // 初回も判定
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // aboutセクションかどうか
  const isAbout = currentSection === 'about';
  const isTitle = currentSection === 'title';

  // currentSectionでりんごのアニメーションを切り替え
  const appleAnimClass = isAbout
    ? 'apple-move-spin'
    : isTitle
    ? 'apple-move-spin-reverse'
    : '';
  const appleAutoRotate = isAbout;

  return (
    <div>
      {/* タイトルセクション */}
      <div ref={titleRef} className="flex flex-col items-center justify-center min-h-screen ">
        {/* りんごは常に画面に固定表示 */}
        {titleAnimEnd && loaded && (
          <div
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 apple-fade-in drop-shadow-lg transition-transform duration-1000 ${appleAnimClass}`}
            style={{ width: 560, height: 560 }}
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
        <div className="mb-4" style={{ minHeight: 560 }} />
        <Title onAnimationEnd={() => setTitleAnimEnd(true)} disappear={isAbout} />
      </div>
      <div style={{ minHeight: 1200, position: 'relative' }}>
        <CircleExpand minSize={0} maxSize={1200} colorClass="bg-orange-400" />
      </div>

      {/* aboutセクション */}
      <div ref={aboutRef} className="flex flex-col items-center justify-center min-h-screen bg-orange-400">
       <Abot /> 
      </div>
    </div>
  );
}
