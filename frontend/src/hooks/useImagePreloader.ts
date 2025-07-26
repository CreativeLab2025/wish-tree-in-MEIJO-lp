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
    console.log('Preloading images with paths:', imagePaths);
    setStatus(prev => ({ ...prev, totalImages: imagePaths.length }));

    try {
      const imagePromises = imagePaths.map((path, index) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          
          img.onload = () => {
            console.log(`Image loaded successfully: ${path}`);
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
      
      console.log('All images loaded successfully');
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