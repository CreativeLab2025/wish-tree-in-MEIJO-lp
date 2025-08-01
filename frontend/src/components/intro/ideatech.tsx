import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import AnimateOnInView from '../AnimateOnInView';

const title = "Ideatech";

export default function Ideatech() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // 一度だけ発火
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="z-[100] max-w-3xl h-200px ml-0 flex flex-col justify-center items-start py-80 my-32 px-10 md:py-80 md:px-20 bg-[#F7F1E8] rounded-3xl shadow-2xl text-left">
      <AnimateOnInView className="" triggerOnce as="h2">
        {({ isVisible }: { isVisible: boolean }) => (
          <span className="text-4xl md:text-6xl font-extrabold mb-6 text-black drop-shadow flex flex-wrap" style={{ lineHeight: 1.0 }}>
            {title.split("").map((char, i) => (
              <span
                key={i}
                className={isVisible ? "falling-char" : ''}
                style={{
                  animationDelay: `${i * 0.07}s`,
                  display: char === " " ? "inline-block" : undefined,
                  minWidth: char === " " ? "0.5em" : undefined,
                }}
              >
                {char === " " ? '\u00A0' : char}
              </span>
            ))}
          </span>
        )}
      </AnimateOnInView>

      <div style={{ height: '200px' }}></div>
      <h3 className={`text-2xl md:text-4xl font-bold mb-10 text-black drop-shadow ${isVisible ? 'animate-fadein-up' : ''}`} style={{ lineHeight: 2.5 }}>
      作って学ぼう！<br />
      そのアイデアを想いのままに。
      </h3>
      <p className={`mb-12 text-xl md:text-2xl text-black tracking-wide ${isVisible ? 'animate-fadein-up' : ''}`} style={{ lineHeight: 2.5 }}>
      初心者も経験者も、<br />
      ゆるく集まって一緒に制作に<br />
      チャレンジできる場所です。
      </p>
      <p className={`mb-12 text-xl md:text-2xl text-black tracking-wide ${isVisible ? 'animate-fadein-up' : ''}`} style={{ lineHeight: 2.5 }}>
      いつもの仲間と、初めての誰かと、<br/>
      ちょっとしたヒラメキをカタチに。
      
      </p>
      <p className={`mb-12 text-xl md:text-2xl text-back tracking-wide ${isVisible ? 'animate-fadein-up' : ''}`} style={{ lineHeight: 2.5 }}>
      気になることがあれば、いつでも覗いてみてください。
      </p>
      <div className="flex justify-center items-center py-10">
      <img src={`${process.env.NODE_ENV === 'production' ? '/wish-tree-in-MEIJO-lp' : ''}/ideatech_logo.png`} alt="ideatech" width={1000} height={1000} />
      </div>
      <Link href="https://x.com/ideaxtech0214">
        <button
          className={`bg-gradient-to-r from-yellow-300  to-green-600 text-white font-bold text-2xl md:text-3xl rounded-full px-12 py-5 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 flex items-center gap-3 ${isVisible ? 'animate-fadein-up' : ''}`}
        >
          <span className="text-white text-3xl">→</span> 公式HPに行く
        </button>
      </Link>
    </section>
  );
}