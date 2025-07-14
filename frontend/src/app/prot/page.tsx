'use client'
import React, { useState, useEffect } from 'react';
import Title from '../../components/Title';
import AppleRotation from '../../components/AppleRotation';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import Abot from '@/components/abot';

export default function ProtPage() {
  const [titleAnimEnd, setTitleAnimEnd] = useState(false);
  const { loaded } = useImagePreloader();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(true);
      window.removeEventListener('scroll', onScroll);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div>
    <div className="flex flex-col items-center justify-center min-h-screen ">
      {/* りんごは常に画面に固定表示 */}
      {titleAnimEnd && loaded && (
        <div
          className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 apple-fade-in drop-shadow-lg transition-transform duration-1000 ${isScrolled ? 'apple-move-spin' : ''}`}
          style={{ width: 560, height: 560 }}
        >
          <AppleRotation autoRotate={isScrolled} size="custom" className="w-[560px] h-[560px]" />
        </div>
      )}
      <div className="mb-4" style={{ minHeight: 560 }} />
      <Title onAnimationEnd={() => setTitleAnimEnd(true)} disappear={isScrolled} />
    </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Abot />
      </div>
    </div>
  );
}
