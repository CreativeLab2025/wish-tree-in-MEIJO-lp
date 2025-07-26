export const TOTAL_FRAMES = 49;
export const IMAGE_BASE_PATH = '/AppleLotatewebp';

/**
 * Generate image path for a specific frame
 */
export const getImagePath = (frameIndex: number): string => {
  const paddedIndex = frameIndex.toString().padStart(4, '0');
  return `${IMAGE_BASE_PATH}/model_frame_${paddedIndex}.webp`;
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