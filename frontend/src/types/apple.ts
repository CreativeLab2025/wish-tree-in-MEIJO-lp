export interface AppleRotationProps {
  size?: 'small' | 'medium' | 'large';
  rotationSpeed?: number;
  scaleRange?: [number, number];
  className?: string;
  triggerOffset?: number;
}

export interface ScrollAnimation {
  scrollProgress: number;
  currentFrame: number;
  scale: number;
  isVisible: boolean;
}

export interface ImagePreloadStatus {
  loaded: boolean;
  totalImages: number;
  loadedImages: number;
  error: boolean;
} 