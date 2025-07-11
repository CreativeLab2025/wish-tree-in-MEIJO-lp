"use client";
import { useState, useEffect, useCallback } from 'react';
import { ImagePreloadStatus } from '@/types/apple';
import { getAllImagePaths } from '@/utils/imageUtils';

export const useImagePreloader = (): ImagePreloadStatus => {
  const [status, setStatus] = useState<ImagePreloadStatus>({
    loaded: false,
    totalImages: 0,
    loadedImages: 0,
    error: false,
  });

  const preloadImages = useCallback(async () => {
    const imagePaths = getAllImagePaths();
    setStatus(prev => ({ ...prev, totalImages: imagePaths.length }));

    try {
      const imagePromises = imagePaths.map((path, index) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          
          img.onload = () => {
            setStatus(prev => ({
              ...prev,
              loadedImages: prev.loadedImages + 1,
            }));
            resolve();
          };
          
          img.onerror = () => {
            console.error(`Failed to load image: ${path}`);
            reject(new Error(`Failed to load image: ${path}`));
          };
          
          img.src = path;
        });
      });

      await Promise.all(imagePromises);
      
      setStatus(prev => ({
        ...prev,
        loaded: true,
        error: false,
      }));
    } catch (error) {
      console.error('Error preloading images:', error);
      setStatus(prev => ({
        ...prev,
        error: true,
      }));
    }
  }, []);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  return status;
}; 