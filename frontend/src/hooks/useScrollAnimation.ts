"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { ScrollAnimation } from '@/types/apple';
import { calculateFrameIndex, calculateScale, throttle } from '@/utils/imageUtils';

interface UseScrollAnimationProps {
  rotationSpeed?: number;
  scaleRange?: [number, number];
  triggerOffset?: number;
}

export const useScrollAnimation = ({
  rotationSpeed = 1,
  scaleRange = [0.5, 1.5],
  triggerOffset = 0.2,
}: UseScrollAnimationProps = {}): [React.RefObject<HTMLDivElement | null>, ScrollAnimation] => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [animation, setAnimation] = useState<ScrollAnimation>({
    scrollProgress: 0,
    currentFrame: 0,
    scale: 1,
    isVisible: false,
  });

  const updateAnimation = useCallback(
    throttle(() => {
      if (!elementRef.current) return;

      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if element is visible
      const isVisible = rect.top < windowHeight && rect.bottom > 0;
      
      if (!isVisible) {
        setAnimation(prev => ({ ...prev, isVisible: false }));
        return;
      }

      // Calculate scroll progress based on element position
      const elementHeight = rect.height;
      const triggerStart = windowHeight * (1 - triggerOffset);
      const triggerEnd = -elementHeight * triggerOffset;
      
      const progress = Math.max(0, Math.min(1, 
        (triggerStart - rect.top) / (triggerStart - triggerEnd)
      ));

      const currentFrame = calculateFrameIndex(progress, rotationSpeed);
      const scale = calculateScale(progress, scaleRange);

      setAnimation({
        scrollProgress: progress,
        currentFrame,
        scale,
        isVisible: true,
      });
    }, 16) // 60fps
  , [rotationSpeed, scaleRange, triggerOffset]);

  useEffect(() => {
    // Intersection Observer for performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', updateAnimation, { passive: true });
            window.addEventListener('resize', updateAnimation, { passive: true });
            updateAnimation(); // Initial call
          } else {
            window.removeEventListener('scroll', updateAnimation);
            window.removeEventListener('resize', updateAnimation);
          }
        });
      },
      {
        rootMargin: '100px', // Start observing 100px before element enters viewport
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateAnimation);
      window.removeEventListener('resize', updateAnimation);
    };
  }, [updateAnimation]);

  return [elementRef, animation];
}; 