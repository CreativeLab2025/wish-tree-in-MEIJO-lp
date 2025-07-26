export const TOTAL_FRAMES = 49;

// GitHub Pagesのベースパスを考慮した画像ベースパス
const getImageBasePath = (): string => {
  // 本番環境ではGitHub Pagesのベースパスを追加
  if (typeof window !== 'undefined') {
    // クライアントサイドでは現在のパスからベースパスを取得
    const pathname = window.location.pathname;
    console.log('Current pathname:', pathname);
    
    // GitHub Pagesのベースパスを検出
    if (pathname.startsWith('/wish-tree-in-MEIJO-lp')) {
      console.log('Using GitHub Pages base path');
      return '/wish-tree-in-MEIJO-lp/AppleLotatewebp';
    }
  }
  
  // 開発環境またはベースパスがない場合
  console.log('Using default base path');
  return '/AppleLotatewebp';
};

/**
 * Generate image path for a specific frame
 */
export const getImagePath = (frameIndex: number): string => {
  const paddedIndex = frameIndex.toString().padStart(4, '0');
  const basePath = getImageBasePath();
  return `${basePath}/model_frame_${paddedIndex}.webp`;
};

/**
 * Generate all image paths
 */
export const getAllImagePaths = (): string[] => {
  return Array.from({ length: TOTAL_FRAMES }, (_, index) => getImagePath(index));
};

/**
 * Calculate frame index based on scroll progress
 */
export const calculateFrameIndex = (
  scrollProgress: number,
  rotationSpeed: number = 1
): number => {
  const adjustedProgress = (scrollProgress * rotationSpeed) % 1;
  return Math.floor(adjustedProgress * TOTAL_FRAMES);
};

/**
 * Calculate scale based on scroll progress and scale range
 */
export const calculateScale = (
  scrollProgress: number,
  scaleRange: [number, number] = [0.5, 1.5]
): number => {
  const [minScale, maxScale] = scaleRange;
  // Create a sine wave for smooth scaling
  const sineProgress = (Math.sin(scrollProgress * Math.PI * 2 - Math.PI / 2) + 1) / 2;
  return minScale + (maxScale - minScale) * sineProgress;
};

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
}; 