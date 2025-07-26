"use client";
import React, { useMemo } from 'react';
import Image from 'next/image';
import { AppleRotationProps } from '@/types/apple';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { getImagePath } from '@/utils/imageUtils';

const AppleRotation: React.FC<any> = ({
  size = 'medium',
  rotationSpeed = 1,
  scaleRange = [0.5, 1.5],
  className = '',
  triggerOffset = 0.2,
  autoRotate = false,
  onScaleChange,
  fruitType = 'apple',
  frameCount: _frameCount,
}) => {
  // frameCountは必ず値を持つようにする
  const frameCount = _frameCount ?? 90;
  const { loaded, loadedImages, totalImages, error } = useImagePreloader();
  const [elementRef, animation] = useScrollAnimation({
    rotationSpeed,
    scaleRange,
    triggerOffset,
  });

  // autoRotate用state
  const [autoFrame, setAutoFrame] = React.useState(0);
  const [autoScale, setAutoScale] = React.useState(1);

  // autoRotate: scale更新時にonScaleChange呼び出し
  React.useEffect(() => {
    if (!autoRotate) return;
    let frame = 0;
    let t = 0;
    const interval = setInterval(() => {
      frame = (frame + Math.max(1, Math.floor(rotationSpeed))) % frameCount;
      setAutoFrame(frame);
      t += 0.04 * rotationSpeed;
      const [minScale, maxScale] = scaleRange;
      const s = minScale + (maxScale - minScale) * (0.5 + 0.5 * Math.sin(t));
      setAutoScale(s);
      if (onScaleChange) onScaleChange(s);
    }, 33);
    return () => clearInterval(interval);
  // 依存配列の順番・数を固定
  }, [autoRotate, rotationSpeed, scaleRange, onScaleChange, frameCount]);

  // scroll連動: scale更新時にonScaleChange呼び出し
  React.useEffect(() => {
    if (autoRotate) return;
    if (onScaleChange) onScaleChange(animation.scale);
  }, [animation.scale, autoRotate, onScaleChange]);

  const sizeClasses = useMemo(() => {
    if (size === 'custom') return '';
    switch (size) {
      case 'small':
        return 'w-32 h-32 md:w-40 md:h-40';
      case 'large':
        return 'w-64 h-64 md:w-80 md:h-80';
      default:
        return 'w-48 h-48 md:w-56 md:h-56';
    }
  }, [size]);

  const currentImagePath = React.useMemo(() => {
    if (autoRotate) {
      return getImagePath(autoFrame);
    }
    return getImagePath(animation.currentFrame);
  }, [animation.currentFrame, autoFrame, autoRotate]);

  if (error) {
    return (
      <div className={`${sizeClasses} ${className} flex items-center justify-center bg-gray-100 rounded-lg`}>
        <p className="text-red-500 text-sm">画像の読み込みに失敗しました</p>
      </div>
    );
  }

  return (
    <div
      ref={autoRotate ? undefined : elementRef}
      className={`${sizeClasses} ${className} relative overflow-hidden`}
      style={{
        willChange: 'transform',
      }}
    >
      {/* Loading indicator */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-2"></div>
          <p className="text-sm text-gray-600">
            {loadedImages}/{totalImages} 読み込み中...
          </p>
        </div>
      )}

      {/* Apple image */}
      <div
        className="w-full h-full transition-opacity duration-300"
        style={{
          transform: `scale(${autoRotate ? autoScale : animation.scale})`,
          opacity: loaded ? 1 : 0,
          willChange: 'transform',
        }}
      >
        <Image
          src={currentImagePath}
          alt="Rotating Apple"
          fill
          className="object-contain"
          priority={animation.currentFrame === 0}
          sizes={size === 'large' ? '320px' : size === 'small' ? '160px' : '224px'}
        />
      </div>
    </div>
  );
};

export default React.memo(AppleRotation); 