import { useState, useEffect, RefObject } from 'react';

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function useSectionProgress(
  aboutRef: RefObject<HTMLDivElement | null>,
  jogikenRef: RefObject<HTMLDivElement | null>
) {
  const [currentSection, setCurrentSection] = useState<'title' | 'about' | 'jogiken'>('title');
  const [scrollProgress, setScrollProgress] = useState(0);

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
  }, [aboutRef, jogikenRef]);

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
  }, [aboutRef, jogikenRef]);

  const easedProgress = easeInOutCubic(scrollProgress);
  return { currentSection, scrollProgress, easedProgress };
} 